import { v } from 'validation-framework';

describe('NumberSchema', () => {
  let numberSchema = v.number().gt(0).lt(10);
  test('should pass validation', () => {
    expect(numberSchema.safeValidate(5)).toEqual([]);
  });

  test('should fail validation', () => {
    expect(numberSchema.safeValidate(15)).toEqual([
      {
        message: 'Value must be less than 10'
      }
    ]);
  });
});
