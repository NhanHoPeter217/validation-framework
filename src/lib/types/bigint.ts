import { Schema } from './schema';
import { Maybe } from '../others';
import { Message } from '../errors/ValidationError';

const isNaN = (value: Maybe<bigint>) => typeof value !== 'bigint';

enum BigIntFunctionEnum {
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

export class BigIntSchema<T extends bigint> extends Schema<T> {
  constructor() {
    super({
      type: 'bigint',
      check: (value) => {
        return typeof value === 'bigint' && !isNaN(value);
      }
    });
  }
  errors = [];

  positive(message: Message = 'Value should be positive'): BigIntSchema<T> {
    return this.addTest({
      name: BigIntFunctionEnum.POSITIVE,
      message: message,
      exclusive: true,
      params: {},
      test: (value) => value > 0n
    });
  }
  nonpositive(message: Message = 'Value should be non positive'): BigIntSchema<T> {
    return this.addTest({
      name: BigIntFunctionEnum.NONPOSITIVE,
      message: message,
      exclusive: true,
      params: {},
      test: (value) => value <= 0n
    });
  }
  negative(message: Message = 'Value should be negative'): BigIntSchema<T> {
    return this.addTest({
      name: BigIntFunctionEnum.NEGATIVE,
      message: message,
      exclusive: true,
      params: {},
      test: (value) => value < 0n
    });
  }
  nonnegative(message: Message = 'Value should be non negative'): BigIntSchema<T> {
    return this.addTest({
      name: BigIntFunctionEnum.NONNEGATIVE,
      message: message,
      exclusive: true,
      params: {},
      test: (value) => value >= 0n
    });
  }
  gt(value: bigint, message: Message = `Value should be greater than ${value}`): BigIntSchema<T> {
    return this.addTest({
      name: BigIntFunctionEnum.GT,
      message: message,
      exclusive: true,
      params: { value },
      test: (val) => val > value
    });
  }
  gte(value: bigint, message: Message = `Value should be greater than or equal to ${value}`): BigIntSchema<T> {
    return this.addTest({
      name: BigIntFunctionEnum.GTE,
      message: message,
      exclusive: true,
      params: { value },
      test: (val) => val >= value
    });
  }
  lt(value: bigint, message: Message = `Value should be less than ${value}`): BigIntSchema<T> {
    return this.addTest({
      name: BigIntFunctionEnum.LT,
      message: message,
      exclusive: true,
      params: { value },
      test: (val) => val < value
    });
  }
  lte(value: bigint, message: Message = `Value should be less than or equal to ${value}`): BigIntSchema<T> {
    return this.addTest({
      name: BigIntFunctionEnum.LTE,
      message: message,
      exclusive: true,
      params: { value },
      test: (val) => val <= value
    });
  }
  multiplyOf(value: bigint, message: Message = `Value should be a multiply of ${value}`): BigIntSchema<T> {
    return this.addTest({
      name: BigIntFunctionEnum.MULTIPLYOF,
      message: message,
      exclusive: true,
      params: { value },
      test: (val) => val % value === 0n
    });
  }
}

export const bigint = (params?: { required_error: string; invalid_type_error: string }) => {
  return new BigIntSchema();
};
