import { v } from '../src';

describe('DateSchema', () => {
  const dateSchema = v.date().min('2018-01-01').max(new Date('2018-12-31T23:59:59Z')).required();

  // const StringSchema2 = StringSchema.required();

  test('should fail validation', () => {
    expect(dateSchema.safeValidate('2017-01-01')).toEqual([
      {
        code: 'min',
        message: 'Date is below the minimum allowed date'
      }
    ]);
  });
});
