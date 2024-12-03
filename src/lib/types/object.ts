import { ValidationError } from '../errors/ValidationError';
import { FieldsErrors, RawShape, Schema, SchemaSpec } from './schema';

type ObjectSchemaSpec = SchemaSpec & {
  shape: RawShape;
};

export type AnyObjectSchema = ObjectSchema<any>;

class ObjectSchema<T extends RawShape> extends Schema<object> {
  protected spec: ObjectSchemaSpec = { shape: {}, nullable: false, optional: false };
  constructor(shape: T) {
    super({
      type: 'object',
      check: (value) => typeof value === 'object' && !Array.isArray(value)
    });

    this.spec.shape = shape;
  }
  errors = [] as ValidationError[];

  get output() {
    type Output = {
      [K in keyof T]: T[K] extends Schema<infer U> ? U : never;
    };
    return {} as Output;
  }

  get shape() {
    return this.spec.shape;
  }

  safeValidate(value: any): ValidationError[] | FieldsErrors<any> {
    this.errors = [];

    if (!this.isType(value)) {
      this.errors.push(`The value must be of type ${this.type}`);
      return this.errors;
    }

    const fieldErrors: FieldsErrors<T> = {};
    for (const [key, schema] of Object.entries(this.spec.shape)) {
      const fieldValue = value[key];
      const fieldErrorsForKey = (schema as Schema<any>).safeValidate(fieldValue);
      if (Array.isArray(fieldErrorsForKey) && fieldErrorsForKey.length > 0) {
        (fieldErrors as FieldsErrors<any>)[key] = fieldErrorsForKey;
      } else if (typeof fieldErrorsForKey === 'object' && Object.keys(fieldErrorsForKey).length > 0) {
        (fieldErrors as FieldsErrors<any>)[key] = fieldErrorsForKey;
      }
    }
    if (Object.keys(fieldErrors).length === 0) {
      for (const test of Object.values(this.internalTests)) {
        if (test && !test.test(value)) {
          this.errors.push(test.message);
        }
      }

      for (const test of this.tests) {
        if (!test.test(value)) {
          this.errors.push(test.message);
        }
      }

      return this.errors;
    }

    return fieldErrors;
  }

  extend(shape: RawShape): this {
    const next = this.clone();
    next.spec.shape = { ...this.spec.shape, ...shape };
    return next;
  }

  merge<T extends AnyObjectSchema>(schema: T): this {
    return this.extend(schema.spec.shape);
  }

  pick<Mask extends { [k in keyof T]?: true }>(mask: Mask): ObjectSchema<Pick<T, Extract<keyof T, keyof Mask>>> {
    const next = this.clone();
    next.spec.shape = Object.keys(mask).reduce((acc, key) => {
      if (key in this.spec.shape) {
        acc[key] = this.spec.shape[key];
      }
      return acc;
    }, {} as RawShape);
    return next;
  }

  omit<Mask extends { [k in keyof T]?: true }>(mask: Mask): ObjectSchema<Omit<T, keyof Mask>> {
    const next = this.clone();
    next.spec.shape = Object.keys(this.spec.shape).reduce((acc, key) => {
      if (!(key in mask)) {
        acc[key] = this.spec.shape[key];
      }
      return acc;
    }, {} as RawShape);
    return next;
  }

  partial(): this {
    const next = this.clone();
    next.spec.optional = true;
    return next;
  }

  keyof(): this {
    const next = this.clone();
    next.spec.optional = false;
    return next;
  }
}

export const object: <T extends RawShape>(
  shape: T,
  params?: { required_error: string; invalid_type_error: string }
) => ObjectSchema<T> = (shape, params) => new ObjectSchema(shape);
