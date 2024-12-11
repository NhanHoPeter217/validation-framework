import { StringFunctionEnum } from '../enums';
import { Error, Message } from '../errors/ValidationError';
import { Maybe } from '../others';
import isAbsent from '../others/isAbsent';
import { defaultStringLocale } from '../others/locale';
import { Schema } from './schema';

const isString = (value: Maybe<string>) => typeof value === 'string';
const isTrimmed = (value: Maybe<string>) => isAbsent(value) || value === value.trim();

export interface MatchOptions {
  includeEmptyString?: boolean;
  message: Message;
  name?: string;
}

// Taken from HTML spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
const rEmail =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const rUrl =
  /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
const rUUID =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
const yearMonthDayISO = '^\\d{4}-\\d{2}-\\d{2}$';
const dayMonthYear = '^\\d{2}-\\d{2}-\\d{4}';
const hourMinuteSecond = '\\d{2}:\\d{2}:\\d{2}';
const zOrOffset = '(([+-]\\d{2}(:?\\d{2})?)|Z)';
const rIsoDate = new RegExp(yearMonthDayISO);
const rDayMonthYear = new RegExp(dayMonthYear);
const rIsoDateTime = new RegExp(`${yearMonthDayISO}T${hourMinuteSecond}(\\.\\d+)?${zOrOffset}$`);

export class StringSchema extends Schema<string> {
  constructor() {
    super({
      type: 'string',
      check: isString
    });
  }
  errors: Error[] = [];

  protected emptyPossibility(emptyPossibility: boolean, message: Message = 'Empty possibility test failed') {
    return this.mutate((next) => {
      next.internalTests.emptyPossibility = {
        message: message,
        name: 'empty possibility',
        test(value) {
          return value === '' ? emptyPossibility : true;
        }
      };

      return next;
    });
  }

  nonEmpty(message = 'The value must not be an empty string') {
    return this.emptyPossibility(false, message);
  }

  required(message = 'The value must not be an empty string') {
    return super.required(message).nonEmpty();
  }

  max(value: number, message: Message = `String length should not exceed ${value}`): this {
    return this.mutate((next) => {
      return next.addTest({
        name: StringFunctionEnum.MAXLENGTH,
        message,
        params: { value },
        exclusive: true,
        test: (str) => str.length <= value
      });
    });
  }

  min(value: number, message: Message = `String length should be at least ${value}`): this {
    return this.mutate((next) => {
      return next.addTest({
        name: StringFunctionEnum.MINLENGTH,
        message,
        params: { value },
        exclusive: true,
        test: (str) => str.length >= value
      });
    });
  }

  matches(regex: RegExp, opts: MatchOptions): this {
    let name: string;
    let message: string;
    let includeEmptyString: boolean;

    if (opts && typeof opts === 'object') {
      ({ name = 'matches', message, includeEmptyString = false } = opts as MatchOptions);
    }

    return this.mutate((next) => {
      return next.addTest({
        name: name ?? 'matches',
        message: message ?? defaultStringLocale.match,
        params: { regex },
        exclusive: true,
        test: (str: Maybe<string>) => (str === '' && includeEmptyString) || str!.search(regex) !== -1
      });
    });
  }

  email(message: string = defaultStringLocale.email): this {
    return this.mutate((next) => {
      return next.matches(rEmail, {
        name: StringFunctionEnum.EMAIL,
        message,
        includeEmptyString: false
      });
    });
  }

  url(message: string = defaultStringLocale.url): this {
    return this.mutate((next) => {
      return next.matches(rUrl, {
        name: StringFunctionEnum.URL,
        message,
        includeEmptyString: false
      });
    });
  }

  uuid(message = defaultStringLocale.uuid): this {
    return this.mutate((next) => {
      return next.matches(rUUID, {
        name: StringFunctionEnum.UUID,
        message,
        includeEmptyString: false
      });
    });
  }

  date(message = defaultStringLocale.date): this {
    return this.mutate((next) => {
      return next.matches(rIsoDate, {
        name: StringFunctionEnum.DATE,
        message,
        includeEmptyString: false
      });
    });
  }

  datetime(message = defaultStringLocale.datetime): this {
    return this.mutate((next) => {
      return next.matches(rIsoDateTime, {
        name: StringFunctionEnum.DATETIME,
        message,
        includeEmptyString: false
      });
    });
  }

  trim(message = defaultStringLocale.trim): this {
    return this.mutate((next) => {
      return next.addTest({
        name: StringFunctionEnum.TRIM,
        message,
        params: {},
        exclusive: true,
        test: isTrimmed
      });
    });
  }

  lowercase(message = defaultStringLocale.lowercase): this {
    return this.mutate((next) => {
      return next.addTest({
        name: StringFunctionEnum.LOWERCASE,
        message,
        params: {},
        exclusive: true,
        test: (str: Maybe<string>) => isAbsent(str) || str === str.toLowerCase()
      });
    });
  }

  uppercase(message = defaultStringLocale.uppercase): this {
    return this.mutate((next) => {
      return next.addTest({
        name: StringFunctionEnum.UPPERCASE,
        message,
        params: {},
        exclusive: true,
        test: (str: Maybe<string>) => isAbsent(str) || str === str.toUpperCase()
      });
    });
  }
}

export const string = (params?: { required_error: string; invalid_type_error: string }) => {
  return new StringSchema();
};
