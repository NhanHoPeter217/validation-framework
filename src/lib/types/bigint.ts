import { BigIntFunctionEnum } from '../enums';
import { Message } from '../errors/ValidationError';
import { Schema } from './schema';

class BigIntSchema extends Schema<bigint> {
  constructor() {
    super({
      type: 'bigint',
      check: (value) => {
        return typeof value === 'bigint';
      }
    });
  }
  errors = [];

  positive(message: Message = 'Value should be positive'): this {
    return this.addTest({
      name: BigIntFunctionEnum.POSITIVE,
      message: message,
      exclusive: true,
      params: {},
      test: (value) => value > 0n
    });
  }
  nonpositive(message: Message = 'Value should be non positive'): this {
    return this.addTest({
      name: BigIntFunctionEnum.NONPOSITIVE,
      message: message,
      exclusive: true,
      params: {},
      test: (value) => value <= 0n
    });
  }
  negative(message: Message = 'Value should be negative'): this {
    return this.addTest({
      name: BigIntFunctionEnum.NEGATIVE,
      message: message,
      exclusive: true,
      params: {},
      test: (value) => value < 0n
    });
  }
  nonnegative(message: Message = 'Value should be non negative'): this {
    return this.addTest({
      name: BigIntFunctionEnum.NONNEGATIVE,
      message: message,
      exclusive: true,
      params: {},
      test: (value) => value >= 0n
    });
  }
  gt(value: bigint, message: Message = `Value should be greater than ${value.toString()}`): this {
    return this.addTest({
      name: BigIntFunctionEnum.GT,
      message: message,
      exclusive: true,
      params: { value },
      test: (val) => val > value
    });
  }
  gte(value: bigint, message: Message = `Value should be greater than or equal to ${value.toString()}`): this {
    return this.addTest({
      name: BigIntFunctionEnum.GTE,
      message: message,
      exclusive: true,
      params: { value },
      test: (val) => val >= value
    });
  }
  lt(value: bigint, message: Message = `Value should be less than ${value.toString()}`): this {
    return this.addTest({
      name: BigIntFunctionEnum.LT,
      message: message,
      exclusive: true,
      params: { value },
      test: (val) => val < value
    });
  }
  lte(value: bigint, message: Message = `Value should be less than or equal to ${value.toString()}`): this {
    return this.addTest({
      name: BigIntFunctionEnum.LTE,
      message: message,
      exclusive: true,
      params: { value },
      test: (val) => val <= value
    });
  }
  multiplyOf(value: bigint, message: Message = `Value should be a multiply of ${value.toString()}`): this {
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
