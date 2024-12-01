export declare type TestFunction = (value: any) => void | boolean | Promise<boolean>;
export declare interface Test {
  name: string;
  test: TestFunction;
  message: string;
  params?: object | null;
  exclusive: boolean;
}

export declare type InternalTest = Omit<Test, 'params' | 'exclusive'>;
export declare type Message = string;
export declare type ValidationError = string;
export type RawShape = Record<string, any>;
export declare type TypeOf<T extends Schema<any>> = T extends Schema<infer U> ? U : never;
export type { TypeOf as infer };

export declare type AnyObjectSchema = ObjectSchema<any>;

export declare interface SchemaSpec {
  nullable: boolean;
  optional: boolean;
}

export abstract class Schema<T> {
  abstract errors: ValidationError[];
  constructor({ type, check }: { type: string; check: (value: any) => boolean });
  clone(): Schema<T>;
  protected nullability(nullable: boolean, message?: Message): Schema<T>;
  protected optionality(optional: boolean, message?: Message): Schema<T>;
  optional(): Schema<T>;
  defined(message?: Message): Schema<T>;
  nullable(): Schema<T>;
  nonNullable(message?: string): Schema<T>;
  required(): Schema<T>;
  nonRequired(): Schema<T>;
  addTest(opts: Test): Schema<T>;
  isType(v: unknown): boolean;
  safeValidate(value: any): ValidationError[];
}

export declare class BooleanSchema extends Schema<boolean> {
  constructor();
  errors: ValidationError[];
  true(message?: Message): this;
  false(message?: Message): this;
}

export declare class BigIntSchema extends Schema<bigint> {
  constructor();
  errors: ValidationError[];
  positive(message?: string): this;
  nonpositive(message?: string): this;
  negative(message?: string): this;
  nonnegative(message?: string): this;
  gt(value: number, message?: string): this;
  gte(value: number, message?: string): this;
  lt(value: number, message?: string): this;
  lte(value: number, message?: string): this;
  multiplyOf(value: number, message?: string): this;
}

export declare class NumberSchema extends Schema<number> {
  constructor();
  errors: ValidationError[];
  zero(message?: string): this;
  positive(message?: string): this;
  nonpositive(message?: string): this;
  negative(message?: string): this;
  nonnegative(message?: string): this;
  odd(message?: string): this;
  even(message?: string): this;
  finite(message?: string): this;
  gt(value: number, message?: string): this;
  gte(value: number, message?: string): this;
  lt(value: number, message?: string): this;
  lte(value: number, message?: string): this;
  int(message?: string): this;
  multiplyOf(value: number, message?: string): this;
}

export declare class ObjectSchema<T extends RawShape> extends Schema<T> {
  constructor(shape: Record<string, Schema<any>>);
  errors: ValidationError[];
  get shape(): T;
  extend(shape: Record<string, Schema<any>>): this;
  merge<T extends AnyObjectSchema>(schema: T): this;
  pick<Mask extends { [k in keyof T]?: true }>(mask: Mask): ObjectSchema<Pick<T, Extract<keyof T, keyof Mask>>>;
  omit(keys: string[]): this;
  partial(): this;
  keyof(): this;
}

declare const boolean: (_params?: { required_error: string; invalid_type_error: string }) => BooleanSchema;
declare const number: (_params?: { required_error: string; invalid_type_error: string }) => NumberSchema;
declare const bigint: (_params?: { required_error: string; invalid_type_error: string }) => BigIntSchema;
declare const object: <T extends RawShape>(
  shape: T,
  params?: { required_error: string; invalid_type_error: string }
) => ObjectSchema<T>;

export { bigint, boolean, number, object };
