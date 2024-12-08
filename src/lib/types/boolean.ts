import { BooleanFunctionEnum } from '../enums';
import { Message } from '../errors/ValidationError';
import { Schema } from './schema';

class BooleanSchema extends Schema<boolean> {
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
    const next = this.clone();
    return next.addTest({
      name: BooleanFunctionEnum.TRUE,
      message: message,
      exclusive: true,
      params: {},
      test: (value) => value === true
    });
  }

  false(message: Message = 'Value should be false'): this {
    const next = this.clone();
    return next.addTest({
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
