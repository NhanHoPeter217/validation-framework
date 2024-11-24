import { Schema } from './schema';
import { Maybe } from './types';
import { Message } from './ValidationError';

const isNaN = (value: Maybe<number>) => value != +value;

export class NumberSchema extends Schema {
  constructor() {
    super({
      type: 'number',
      check: (value) => {
        if (value instanceof Number) value = value.valueOf();

        return typeof value === 'number' && !isNaN(value);
      }
    });
  }

  errors = [];

  min(min: number, message?: Message) {
    return this.addTest({
      name: 'min',
      message: message || `The value must be greater than ${min}`,
      exclusive: true,
      params: {},
      test: (value) => {
        return min < value;
      }
    });
  }
}
