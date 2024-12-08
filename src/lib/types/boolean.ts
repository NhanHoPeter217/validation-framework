import { BooleanFunctionEnum } from '../enums';
import { Error, Message } from '../errors/ValidationError';
import { Schema } from './schema';

export class BooleanSchema extends Schema<boolean> {
  constructor() {
    super({
      type: 'boolean',
      check: (value) => {
        return typeof value === 'boolean';
      }
    });
  }
  errors: Error[] = [];

  true(message: Message = 'Value should be true'): this {
    return this.mutate((next) => {
      return next.addTest({
        name: BooleanFunctionEnum.TRUE,
        message: message,
        exclusive: true,
        params: {},
        test: (value) => value === true
      });
    });
  }

  false(message: Message = 'Value should be false'): this {
    return this.mutate((next) => {
      return next.addTest({
        name: BooleanFunctionEnum.FALSE,
        message: message,
        exclusive: true,
        params: {},
        test: (value) => value === false
      });
    });
  }
}

export const boolean = (params?: { required_error: string; invalid_type_error: string }) => {
  return new BooleanSchema();
};
