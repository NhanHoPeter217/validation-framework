import { BaseSchema } from './base';
import { ErrorMessage } from './error';

class BigIntSchema extends BaseSchema<bigint, ErrorMessage> {
  private value: bigint = 0n;
  errors: ErrorMessage[] = [];

  constructor() {
    super((value: unknown) => {
      if (typeof value !== 'number') {
        this.errors.push('Value should be a bigint');
        throw new Error('Value should be a bigint');
      }
      return value as unknown as bigint;
    });
  }

  positive(message: ErrorMessage = 'Value should be positive'): BigIntSchema {
    if (this.value < 0) {
      this.errors.push(message);
    }
    return this;
  }
  nonpositive(message: ErrorMessage = 'Value should be non positive'): BigIntSchema {
    if (this.value >= 0) {
      this.errors.push(message);
    }
    return this;
  }
  negative(message: ErrorMessage = 'Value should be negative'): BigIntSchema {
    if (this.value > 0) {
      this.errors.push(message);
    }
    return this;
  }
  nonnegative(message: ErrorMessage = 'Value should be non negative'): BigIntSchema {
    if (this.value <= 0) {
      this.errors.push(message);
    }
    return this;
  }
  gt(value: bigint, message: ErrorMessage = `Value should be greater than ${value}`): BigIntSchema {
    if (this.value <= value) {
      this.errors.push(message);
    }
    return this;
  }
  gte(value: bigint, message: ErrorMessage = `Value should be greater than or equal to ${value}`): BigIntSchema {
    if (this.value < value) {
      this.errors.push(message);
    }
    return this;
  }
  lt(value: bigint, message: ErrorMessage = `Value should be less than ${value}`): BigIntSchema {
    if (this.value >= value) {
      this.errors.push(message);
    }
    return this;
  }
  lte(value: bigint, message: ErrorMessage = `Value should be less than or equal to ${value}`): BigIntSchema {
    if (this.value > value) {
      this.errors.push(message);
    }
    return this;
  }
  multiplyOf(value: bigint, message: ErrorMessage = `Value should be a multiply of ${value}`): BigIntSchema {
    if (this.value % value !== 0n) {
      this.errors.push(message);
    }
    return this;
  }
}

export const bigint = (params?: { required_error: string; invalid_type_error: string }) => {
  return new BigIntSchema();
};
