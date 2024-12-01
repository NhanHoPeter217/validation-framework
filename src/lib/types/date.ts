import { ValidationError } from '../errors';
import { defaultDateLocale } from '../others/locale';
import { Schema } from './schema';

const isDate = (obj: any): obj is Date => Object.prototype.toString.call(obj) === '[object Date]';

const invalidDate = new Date('');

enum DateFunctionEnum {
  MIN = 'min',
  MAX = 'max',
  SAFE_VALIDATE = 'safeValidate'
}

class DateSchema<T extends Date> extends Schema<T> {
  static INVALID_DATE = invalidDate;

  constructor() {
    super({
      type: 'date',
      check: (value: any): value is NonNullable<T> => isDate(value) && !isNaN(value.getTime())
    });
  }
  errors = [];

  safeValidate(value: any): ValidationError[] {
    return super.safeValidate(this.prepareParam(value, DateFunctionEnum.SAFE_VALIDATE));
  }

  private prepareParam(ref: unknown, name: string): Date {
    let param: Date = new Date('');

    if (!isDate(ref)) {
      const cast = new Date(ref as string | number);
      if (!isDate(cast)) {
        throw new TypeError(`Invalid date parameter for ${name} method`);
      }

      param = cast;
    } else {
      param = ref as Date;
    }

    return param;
  }

  min(date: unknown | Date, message = defaultDateLocale.min): DateSchema<T> {
    const minDate = this.prepareParam(date, DateFunctionEnum.MIN);

    return this.addTest({
      name: DateFunctionEnum.MIN,
      message,
      params: { date },
      exclusive: true,
      test: (value) => value >= minDate
    });
  }

  max(date: unknown | Date, message = defaultDateLocale.max): DateSchema<T> {
    const maxDate = this.prepareParam(date, DateFunctionEnum.MAX);

    return this.addTest({
      name: DateFunctionEnum.MAX,
      message,
      params: { date },
      exclusive: true,
      test: (value) => value <= maxDate
    });
  }
}

export const date = (params?: { required_error: string; invalid_type_error: string }) => {
  return new DateSchema();
};
