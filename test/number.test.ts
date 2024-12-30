import { v } from '../src/index';

describe('NumberSchema', () => {
  test('should pass validation', () => {
    const numberSchema = v.number();
    const number = 5;
    expect(numberSchema.safeValidate(number)).toEqual([]);
  });

  test('should fail validation', () => {
    const minTest = v.number().lt(10);
    expect(minTest.safeValidate(15)).toEqual([{ code: 'lt', message: 'Value should be less than 10' }]);
  });
});
