import { v } from '../src';

describe('StringSchema', () => {
  const StringSchema = v
    .string()
    .required()
    .matches(/^[1-9]+$/);
  const date = v.date().min(625276800000).max('2021-12-30');

  test('should pass validation', () => {
    expect(StringSchema.safeValidate('1234560789')).toEqual([
      {
        code: 'matches',
        message: 'String does not match the required pattern'
      }
    ]);
  });

  const stringg = v.string().max(10);

  test('should pass validation', () => {
    expect(stringg.safeValidate('1234567890')).toEqual([]);
    expect(date.safeValidate('2021-12-30')).toEqual([]);
  });

  test('should fail validation', () => {
    expect(stringg.safeValidate('123456867681')).toEqual([
      {
        code: 'maxLength',
        message: 'String length should not exceed 10'
      }
    ]);
    expect(date.safeValidate('2022-12-30')).toEqual([
      {
        code: 'max',
        message: 'Date is above the maximum allowed date'
      }
    ]);
  });
});
