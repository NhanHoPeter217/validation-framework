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
  constructor(shape: { [K in keyof T]: Schema<any> }) {
    super({
      type: 'object',
      check: (value) => typeof value === 'object'
    });

    this.spec.shape = shape;
  }

  get shape() {
    return this.spec.shape;
  }

  safeValidate(value: any = {}): Error[] {
    this.errors = super.safeValidate(value);
    const fieldErrors: Error[] = [];

    for (const [key, schema] of Object.entries(this.spec.shape)) {
      const fieldValue = value[key];
      // parse to schema, not only validate
      let instance = schema as Schema<unknown>;
      if (!(schema instanceof Schema)) {
        instance = new ObjectSchema(schema);
      }

      const fieldErrorsForKey = instance.safeValidate(fieldValue);
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

      return this.errors;
    }

    return fieldErrors;
  }

  extend<K extends RawShape>(shape: K): ObjectSchema<T & K> {
    const next = new ObjectSchema<T & K>({} as any);
    next.spec.shape = { ...this.spec.shape, ...shape };
    return next;
  }

  merge<K extends RawShape>(schema: ObjectSchema<K>): ObjectSchema<T & K> {
    const next = new ObjectSchema<T & K>({} as any);
    next.spec.shape = { ...this.spec.shape, ...schema.spec.shape };
    return next;
  }

  pick<Mask extends { [k in keyof T]?: true }>(mask: Mask): ObjectSchema<Pick<T, Extract<keyof T, keyof Mask>>> {
    const next = new ObjectSchema<Pick<T, Extract<keyof T, keyof Mask>>>({} as any);
    next.spec.shape = Object.keys(this.spec.shape).reduce((acc, key) => {
      if (key in mask) {
        acc[key] = this.spec.shape[key];
      }
      return acc;
    }, {} as RawShape);

    return next;
  }

  omit<Mask extends { [k in keyof T]?: true }>(mask: Mask): ObjectSchema<Omit<T, keyof Mask>> {
    const next = new ObjectSchema<Omit<T, keyof Mask>>({} as any);
    next.spec.shape = Object.keys(this.spec.shape).reduce((acc, key) => {
      if (!(key in mask)) {
        acc[key] = this.spec.shape[key];
      }
      return acc;
    }, {} as RawShape);
    return next;
  }

  partial<Mask extends { [k in keyof T]?: true }>(mask?: Mask): this {
    return this.mutate((next) => {
      next.spec.shape = Object.keys(this.spec.shape).reduce((acc, key) => {
        if (!mask || key in mask) {
          acc[key] = this.spec.shape[key].optional();
        }
        return acc;
      }, {} as RawShape);
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
