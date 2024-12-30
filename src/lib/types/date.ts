import { DateFunctionEnum } from '../enums';
import { Error } from '../errors/ValidationError';
import { defaultDateLocale } from '../others/locale';
import { Schema } from './schema';

const isDate = (obj: any): obj is Date => Object.prototype.toString.call(obj) === '[object Date]';

const invalidDate = new Date('');
export class DateSchema extends Schema<Date | undefined> {
  static INVALID_DATE = invalidDate;

  constructor() {
    super({
      type: 'date',
      check: (value: any): value is NonNullable<Date> => isDate(value) && !isNaN(value.getTime())
    });
  }
  errors: Error[] = [];

  safeValidate(value: any): Error[] {
    return typeof value === 'string' || typeof value === 'number'
      ? super.safeValidate(this.prepareParam(value, DateFunctionEnum.SAFE_VALIDATE))
      : super.safeValidate(value);
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

  min(date: unknown | Date, message = defaultDateLocale.min): this {
    const minDate = this.prepareParam(date, DateFunctionEnum.MIN);
    return this.mutate((next) => {
      return next.addTest({
        name: DateFunctionEnum.MIN,
        message,
        params: { date },
        exclusive: true,
        test: (value) => value >= minDate
      });
    });
  }

  max(date: unknown | Date, message = defaultDateLocale.max): this {
    const maxDate = this.prepareParam(date, DateFunctionEnum.MAX);
    return this.mutate((next) => {
      return next.addTest({
        name: DateFunctionEnum.MAX,
        message,
        params: { date },
        exclusive: true,
        test: (value) => value <= maxDate
      });
    });
  }
}

export const date = (params?: { required_error: string; invalid_type_error: string }) => {
  return new DateSchema();
};
