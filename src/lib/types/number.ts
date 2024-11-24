import { BaseSchema } from './base';
import { ErrorMessage } from './error';

class NumberSchema extends BaseSchema<number, ErrorMessage> {
  private value: number = 0;
  errors: ErrorMessage[] = [];

  constructor() {
    super((value: unknown) => {
      if (typeof value !== 'number') {
        this.errors.push('Value should be a number');
        throw new Error('Value should be a number');
      }
      return value as number;
    });
  }

  zero(message: ErrorMessage = 'Value should be 0'): NumberSchema {
    // return this.refine(() => {
    if (this.value !== 0) {
      this.errors.push(message);
      //   throw new Error(message);
    }
    return this;
    // });
  }

  positive(message: ErrorMessage = 'Value should be positive'): NumberSchema {
    if (this.value < 0) {
      this.errors.push(message);
    }
    return this;
  }

  nonpositive(message: ErrorMessage = 'Value should be non positive'): NumberSchema {
    if (this.value >= 0) {
      this.errors.push(message);
    }
    return this;
  }

  negative(message: ErrorMessage = 'Value should be negative'): NumberSchema {
    if (this.value > 0) {
      this.errors.push(message);
    }
    return this;
  }

  nonnegative(message: ErrorMessage = 'Value should be non negative'): NumberSchema {
    if (this.value <= 0) {
      this.errors.push(message);
    }
    return this;
  }

  odd(message: ErrorMessage = 'Value should be odd'): NumberSchema {
    if (this.value % 2 === 1) {
      this.errors.push(message);
    }
    return this;
  }

  even(message: ErrorMessage = 'Value should be even'): NumberSchema {
    if (this.value % 2 !== 1) {
      this.errors.push(message);
    }
    return this;
  }

  finite(message: ErrorMessage = 'Value should be finite'): NumberSchema {
    if (!isFinite(this.value)) {
      this.errors.push(message);
    }
    return this;
  }
  gt(value: number, message: ErrorMessage = `Value should be greater than ${value}`): NumberSchema {
    if (this.value <= value) {
      this.errors.push(message);
    }
    return this;
  }

  gte(value: number, message: ErrorMessage = `Value should be greater than or equal to ${value}`): NumberSchema {
    if (this.value < value) {
      this.errors.push(message);
    }
    return this;
  }

  lt(value: number, message: ErrorMessage = `Value should be less than ${value}`): NumberSchema {
    if (this.value >= value) {
      this.errors.push(message);
    }
    return this;
  }

  lte(value: number, message: ErrorMessage = `Value should be less than or equal to ${value}`): NumberSchema {
    if (this.value > value) {
      this.errors.push(message);
    }
    return this;
  }

  int(message: ErrorMessage = 'Value should be int'): NumberSchema {
    if (this.value % 1 !== 0) {
      this.errors.push(message);
    }
    return this;
  }

  multiplyOf(value: number, message: ErrorMessage = `Value should be multiply of ${value}`): NumberSchema {
    if (this.value % value !== 0) {
      this.errors.push(message);
    }
    return this;
  }
}

export const number = (params?: { required_error: string; invalid_type_error: string }) => {
  return new NumberSchema();
};
