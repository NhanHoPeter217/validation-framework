export enum BooleanFunctionEnum {
  TRUE = 'true',
  FALSE = 'false'
}

export enum NumberFunctionEnum {
  ZERO = 'zero',
  POSITIVE = 'positive',
  NONPOSITIVE = 'nonpositive',
  NEGATIVE = 'negative',
  NONNEGATIVE = 'nonnegative',
  ODD = 'odd',
  EVEN = 'even',
  FINITE = 'finite',
  GT = 'gt',
  GTE = 'gte',
  LT = 'lt',
  LTE = 'lte',
  INT = 'int',
  MULTIPLEOF = 'multipleOf'
}

export enum BigIntFunctionEnum {
  POSITIVE = NumberFunctionEnum.POSITIVE,
  NONPOSITIVE = NumberFunctionEnum.NONPOSITIVE,
  NEGATIVE = NumberFunctionEnum.NEGATIVE,
  NONNEGATIVE = NumberFunctionEnum.NONNEGATIVE,
  GT = NumberFunctionEnum.GT,
  GTE = NumberFunctionEnum.GTE,
  LT = NumberFunctionEnum.LT,
  LTE = NumberFunctionEnum.LTE,
  MULTIPLYOF = NumberFunctionEnum.MULTIPLEOF
}

export enum DateFunctionEnum {
  MIN = 'min',
  MAX = 'max',
  SAFE_VALIDATE = 'safeValidate'
}

export enum StringFunctionEnum {
  MAXLENGTH = 'maxLength',
  MINLENGTH = 'minLength',
  EMAIL = 'email',
  URL = 'url',
  UUID = 'uuid',
  DATE = 'date',
  DATETIME = 'datetime',
  DATETIME_OFFSET = 'datetime_offset',
  DATETIME_PRECISION = 'datetime_precision',
  TRIM = 'trim',
  LOWERCASE = 'lowercase',
  UPPERCASE = 'uppercase',
  MATCHES = 'matches'
}
