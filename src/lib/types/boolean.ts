import { Message } from '../errors/ValidationError';
import { Schema } from './schema';

enum BooleanFunctionEnum {
  TRUE = 'true',
  FALSE = 'false'
}

class BooleanSchema<T extends boolean> extends Schema<T> {
  constructor() {
    super({
      type: 'boolean',
      check: (value) => {
        return typeof value === 'boolean';
      }
    });
  }
  errors = [];

  true(message: Message = 'Value should be true'): this {
    return this.addTest({
      name: BooleanFunctionEnum.TRUE,
      message: message,
      exclusive: true,
      params: {},
      test: (value) => value === true
    });
  }

  false(message: Message = 'Value should be false'): this {
    return this.addTest({
      name: BooleanFunctionEnum.FALSE,
      message: message,
      exclusive: true,
      params: {},
      test: (value) => value === false
    });
  }
}

export const boolean = (params?: { required_error: string; invalid_type_error: string }) => {
  return new BooleanSchema();
};
