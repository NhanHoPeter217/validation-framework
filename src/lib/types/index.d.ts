export declare type InferType<T extends BaseSchema<any, ErrorMessage>> =
  T extends BaseSchema<infer U, ErrorMessage> ? U : never;
export declare type SchemaMap = Record<string, BaseSchema<any, ErrorMessage>>;
export declare type Validator<T> = (value: any) => T;
export declare type ParseInput = {
  data: any;
};
export declare type ErrorMessage = string;
export declare type RequiredMessage = string;

export declare type ParseReturnType<T> =
  | {
      value: T;
    }
  | {
      value: T;
      errors: ErrorMessage[];
    }
  | {
      errors: ErrorMessage[];
    };

export declare enum SchemaPrimitiveTypeKind {
  Number = 'number',
  Boolean = 'boolean'
}

export declare type SchemaPrimitiveType = number | boolean;

export declare abstract class BaseSchema<T, ErrorMessage> {
  private check: (value: unknown) => T;
  constructor(check: (value: unknown) => T);
  abstract _parse(input: ParseInput): ParseReturnType<T>;
  parse(data: unknown): any;
  getErrors(): string[];
  hasErrors(): boolean;
}

export declare class BooleanSchema extends BaseSchema<boolean, ErrorMessage> {
  constructor();
  _parse(input: ParseInput): ParseReturnType<boolean>;
  isTrue(): BooleanSchema;
  isFalse(): BooleanSchema;
}

export declare class NumberSchema extends BaseSchema<number, ErrorMessage> {
  constructor();
  _parse(input: ParseInput): ParseReturnType<number>;
  positive(message?: ErrorMessage): NumberSchema;
  nonpositive(message?: ErrorMessage): NumberSchema;
  negative(message?: ErrorMessage): NumberSchema;
  nonnegative(message?: ErrorMessage): NumberSchema;
  zero(message?: ErrorMessage): NumberSchema;
  finite(message?: ErrorMessage): NumberSchema;
  gt(value: number, message?: ErrorMessage): NumberSchema;
  gte(value: number, message?: ErrorMessage): NumberSchema;
  lt(value: number, message?: ErrorMessage): NumberSchema;
  lte(value: number, message?: ErrorMessage): NumberSchema;
  odd(message?: ErrorMessage): NumberSchema;
  even(message?: ErrorMessage): NumberSchema;
  int(message?: ErrorMessage): NumberSchema;
  multiplyOf(value: number, message?: ErrorMessage): NumberSchema;
}

export declare class BigIntSchema extends BaseSchema<bigint, ErrorMessage> {
  constructor();
  _parse(input: ParseInput): ParseReturnType<bigint>;
  positive(message?: ErrorMessage): BigIntSchema;
  nonpositive(message?: ErrorMessage): BigIntSchema;
  negative(message?: ErrorMessage): BigIntSchema;
  nonnegative(message?: ErrorMessage): BigIntSchema;
  gt(value: bigint, message?: ErrorMessage): BigIntSchema;
  gte(value: bigint, message?: ErrorMessage): BigIntSchema;
  lt(value: bigint, message?: ErrorMessage): BigIntSchema;
  lte(value: bigint, message?: ErrorMessage): BigIntSchema;
  multiplyOf(value: bigint, message?: ErrorMessage): BigIntSchema;
}

declare function number(params?: { required_error: string; invalid_type_error: string }): NumberSchema;
declare function boolean(params?: { required_error: string; invalid_type_error: string }): BooleanSchema;
export { number, boolean };
