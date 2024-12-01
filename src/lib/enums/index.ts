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
  MULTIPLYOF = 'multiplyOf'
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
  MULTIPLYOF = NumberFunctionEnum.MULTIPLYOF
}
