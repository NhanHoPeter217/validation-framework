import { v } from '../src/index';

describe('NumberSchema', () => {
  const numberSchema = v.number().gt(0).lt(10);
  test('should pass validation', () => {
    expect(numberSchema.safeValidate(5)).toEqual([]);
  });

  test('should fail validation', () => {
    expect(numberSchema.safeValidate(15)).toEqual([{ code: 'lt', message: 'Value should be less than 10' }]);
  });
});
