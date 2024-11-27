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

export declare enum BooleanFunctionEnum {
  TRUE = 'true',
  FALSE = 'false'
}

export declare class BooleanSchema<T extends boolean> extends Schema<T> {
  constructor();
  errors: ValidationError[];
  true(message?: Message): BooleanSchema<T>;
  false(message?: Message): BooleanSchema<T>;
}

export declare enum BigIntFunctionEnum {
  POSITIVE = 'positive',
  NONPOSITIVE = 'nonpositive',
  NEGATIVE = 'negative',
  NONNEGATIVE = 'nonnegative',
  GT = 'gt',
  GTE = 'gte',
  LT = 'lt',
  LTE = 'lte',
  MULTIPLYOF = 'multiplyOf'
}

export declare class BigIntSchema<T extends bigint> extends Schema<T> {
  constructor();
  errors: ValidationError[];
  positive(message?: string): BigIntSchema<T>;
  nonpositive(message?: string): BigIntSchema<T>;
  negative(message?: string): BigIntSchema<T>;
  nonnegative(message?: string): BigIntSchema<T>;
  gt(value: number, message?: string): BigIntSchema<T>;
  gte(value: number, message?: string): BigIntSchema<T>;
  lt(value: number, message?: string): BigIntSchema<T>;
  lte(value: number, message?: string): BigIntSchema<T>;
  multiplyOf(value: number, message?: string): BigIntSchema<T>;
}

export declare enum NumberFunctionEnum {
  ZERO = 'zero',
  POSITIVE = 'positive',
  NONPOSITIVE = 'nonpositive',
  NEGATIVE = 'negative',
  NONNEGATIVE = 'nonnegative',
  ODD = 'odd',
  EVEN = 'even',
  FINITE = 'finite',
  GT = 'gt',
  GTE = 'gte',
  LT = 'lt',
  LTE = 'lte',
  INT = 'int',
  MULTIPLYOF = 'multiplyOf'
}

export declare class NumberSchema<T extends number> extends Schema<T> {
  constructor();
  errors: ValidationError[];
  zero(message?: string): NumberSchema<T>;
  positive(message?: string): NumberSchema<T>;
  nonpositive(message?: string): NumberSchema<T>;
  negative(message?: string): NumberSchema<T>;
  nonnegative(message?: string): NumberSchema<T>;
  odd(message?: string): NumberSchema<T>;
  even(message?: string): NumberSchema<T>;
  finite(message?: string): NumberSchema<T>;
  gt(value: number, message?: string): NumberSchema<T>;
  gte(value: number, message?: string): NumberSchema<T>;
  lt(value: number, message?: string): NumberSchema<T>;
  lte(value: number, message?: string): NumberSchema<T>;
  int(message?: string): NumberSchema<T>;
  multiplyOf(value: number, message?: string): NumberSchema<T>;
}
declare function boolean(params?: { required_error: string; invalid_type_error: string }): BooleanSchema<boolean>;
declare function number(params?: { required_error: string; invalid_type_error: string }): NumberSchema<number>;
declare function bigint(params?: { required_error: string; invalid_type_error: string }): BigIntSchema<bigint>;

export { bigint,boolean, number };
