import { v } from '../src';

describe('NumberSchema', () => {
  const numberSchema = v.number().gt(0).lt(10);
  test('should pass validation', () => {
    expect(numberSchema.safeValidate(5)).toEqual([]);
  });

  test('should fail validation', () => {
    expect(numberSchema.safeValidate(15)).toEqual(['Value should be less than 10']);
  });
});
