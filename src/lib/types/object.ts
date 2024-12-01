import { RawShape, Schema, SchemaSpec } from './schema';

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
  errors = [];

  get output() {
    type Output = {
      [K in keyof T]: T[K] extends Schema<infer U> ? U : never;
    };
    return {} as Output;
  }

  get shape() {
    return this.spec.shape;
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
        console.log(key);
        acc[key] = this.spec.shape[key];
      }
      return acc;
    }, {} as RawShape);
    console.log('next' + next);
    return next;
  }
}

<T extends RawShape>(shape: T, params?: { required_error: string; invalid_type_error: string }) => {
  return new ObjectSchema<RawShape>(shape);
};
export const object: <T extends RawShape>(
  shape: T,
  params?: { required_error: string; invalid_type_error: string }
) => ObjectSchema<T> = (shape, params) => new ObjectSchema(shape);
