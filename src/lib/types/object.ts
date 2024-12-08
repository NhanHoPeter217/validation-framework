import { Error } from '../errors/ValidationError';
import { RawShape, Schema, SchemaSpec, TypeOf } from './schema';

type ObjectSchemaSpec = SchemaSpec & {
  shape: RawShape;
};

export type AnyObjectSchema = ObjectSchema<any>;

export class ObjectSchema<T extends RawShape, TOutput = { [K in keyof T]: TypeOf<T[K]> }> extends Schema<
  object,
  TOutput
> {
  errors: Error[] = [];

  protected spec: ObjectSchemaSpec = { shape: {}, nullable: false, optional: false };
  constructor(shape: T) {
    super({
      type: 'object',
      check: (value) => typeof value === 'object' && !Array.isArray(value)
    });

    this.spec.shape = shape;
  }

  get output() {
    type Output = {
      [K in keyof T]: T[K] extends Schema<infer U> ? U : never;
    };
    return {} as Output;
  }

  get shape() {
    return this.spec.shape;
  }

  safeValidate(value: any): Error[] {
    this.errors = super.safeValidate(value);
    const fieldErrors: Error[] = [];

    for (const [key, schema] of Object.entries(this.spec.shape)) {
      const fieldValue = value[key];
      const fieldErrorsForKey = (schema as Schema<any>).safeValidate(fieldValue);
      if (fieldErrorsForKey.length > 0) {
        fieldErrorsForKey.forEach((error) => {
          fieldErrors.push({ ...error, path: [key] });
        });
      }
    }
    if (Object.keys(fieldErrors).length === 0) {
      for (const test of Object.values(this.internalTests)) {
        if (test && !test.test(value)) {
          this.errors.push({ message: test.message, code: test.name });
        }
      }

      // for (const test of this.tests) {
      //   if (!test.test(value)) {
      //     this.errors = { ...this.errors, [test.name]: [test.message] };
      //   }
      // }

      return this.errors;
    }

    return fieldErrors;
  }

  extend(shape: RawShape): this {
    return this.mutate((next) => {
      next.spec.shape = { ...this.spec.shape, ...shape };
      return next;
    });
  }

  merge<T extends AnyObjectSchema>(schema: T): this {
    return this.extend(schema.spec.shape);
  }

  pick<Mask extends { [k in keyof T]?: true }>(
    mask: Mask
  ): ObjectSchema<Pick<T, Extract<keyof T, keyof Mask>>, TOutput> {
    return this.mutate((next) => {
      next.spec.shape = Object.keys(mask).reduce((acc, key) => {
        if (key in this.spec.shape) {
          acc[key] = this.spec.shape[key];
        }
        return acc;
      }, {} as RawShape);
      return next;
    });
  }

  omit<Mask extends { [k in keyof T]?: true }>(mask: Mask): ObjectSchema<Omit<T, keyof Mask>, TOutput> {
    return this.mutate((next) => {
      next.spec.shape = Object.keys(this.spec.shape).reduce((acc, key) => {
        if (!(key in mask)) {
          acc[key] = this.spec.shape[key];
        }
        return acc;
      }, {} as RawShape);
      return next;
    });
  }

  partial(): this {
    return this.mutate((next) => {
      next.spec.optional = true;
      return next;
    });
  }

  keyof(): this {
    return this.mutate((next) => {
      next.spec.optional = false;
      return next;
    });
  }
}

export const object: <T extends RawShape>(
  shape: T,
  params?: { required_error: string; invalid_type_error: string }
) => ObjectSchema<T> = (shape, params) => new ObjectSchema(shape);
