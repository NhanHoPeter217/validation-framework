import { Message } from '../errors/ValidationError';
import { Maybe } from '../others';
import { Schema } from './schema';

const isNaN = (value: Maybe<number>) => value == null || value != +value;

enum NumberFunctionEnum {
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

class NumberSchema<T extends number> extends Schema<T> {
  constructor() {
    super({
      type: 'number',
      check: (value) => {
        return typeof value === 'number' && !isNaN(value);
      }
    });
  }
  errors = [];

  zero(message: Message = 'Value should be 0'): this {
    return this.addTest({
      name: NumberFunctionEnum.ZERO,
      message: message,
      exclusive: true,
      params: {},
      test: (value) => value === 0
    });
  }

  positive(message: Message = 'Value should be positive'): this {
    return this.addTest({
      name: NumberFunctionEnum.POSITIVE,
      message: message,
      exclusive: true,
      params: {},
      test: (value) => value > 0
    });
  }

  nonpositive(message: Message = 'Value should be non-positive'): this {
    return this.addTest({
      name: NumberFunctionEnum.NONPOSITIVE,
      message: message,
      exclusive: true,
      params: {},
      test: (value) => value <= 0
    });
  }

  negative(message: Message = 'Value should be negative'): this {
    return this.addTest({
      name: NumberFunctionEnum.NEGATIVE,
      message: message,
      exclusive: true,
      params: {},
      test: (value) => value < 0
    });
  }

  nonnegative(message: Message = 'Value should be non-negative'): this {
    return this.addTest({
      name: NumberFunctionEnum.NONNEGATIVE,
      message: message,
      exclusive: true,
      params: {},
      test: (value) => value >= 0
    });
  }

  odd(message: Message = 'Value should be odd'): this {
    return this.addTest({
      name: NumberFunctionEnum.ODD,
      message: message,
      exclusive: true,
      params: {},
      test: (value) => value % 2 !== 0
    });
  }

  even(message: Message = 'Value should be even'): this {
    return this.addTest({
      name: NumberFunctionEnum.EVEN,
      message: message,
      exclusive: true,
      params: {},
      test: (value) => value % 2 === 0
    });
  }

  finite(message: Message = 'Value should be finite'): this {
    return this.addTest({
      name: NumberFunctionEnum.FINITE,
      message: message,
      exclusive: true,
      params: {},
      test: (value: number) => isFinite(value)
    });
  }

  gt(value: number, message: Message = `Value should be greater than ${value.toString()}`): this {
    return this.addTest({
      name: NumberFunctionEnum.GT,
      message: message,
      exclusive: true,
      params: { value },
      test: (val) => val > value
    });
  }

  gte(value: number, message: Message = `Value should be greater than or equal to ${value.toString()}`): this {
    return this.addTest({
      name: NumberFunctionEnum.GTE,
      message: message,
      exclusive: true,
      params: { value },
      test: (val) => val >= value
    });
  }

  lt(value: number, message: Message = `Value should be less than ${value.toString()}`): this {
    return this.addTest({
      name: NumberFunctionEnum.LT,
      message: message,
      exclusive: true,
      params: { value },
      test: (val) => val < value
    });
  }

  lte(value: number, message: Message = `Value should be less than or equal to ${value.toString()}`): this {
    return this.addTest({
      name: NumberFunctionEnum.LTE,
      message: message,
      exclusive: true,
      params: { value },
      test: (val) => val <= value
    });
  }

  int(message: Message = 'Value should be an integer'): this {
    return this.addTest({
      name: NumberFunctionEnum.INT,
      message: message,
      exclusive: true,
      params: {},
      test: (value) => Number.isInteger(value)
    });
  }

  multiplyOf(value: number, message: Message = `Value should be a multiple of ${value.toString()}`): this {
    return this.addTest({
      name: NumberFunctionEnum.MULTIPLYOF,
      message: message,
      exclusive: true,
      params: { value },
      test: (val) => val % value === 0
    });
  }
}

export const number = (params?: { required_error: string; invalid_type_error: string }) => {
  return new NumberSchema();
};
