import { BaseSchema } from './base';
import { ErrorMessage } from './error';

class BooleanSchema extends BaseSchema<boolean, ErrorMessage> {
  private value: boolean = false;
  errors: ErrorMessage[] = [];

  constructor() {
    super((value: unknown) => {
      if (typeof value !== 'boolean') {
        throw new Error('Value should be a boolean');
      }
      return value as boolean;
    });
  }
}

export const boolean = (params?: { required_error: string; invalid_type_error: string }) => {
  return new BooleanSchema();
};
