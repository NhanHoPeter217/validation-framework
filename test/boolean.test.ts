import { v } from '../src';

describe('BooleanSchema', () => {
  const booleanSchema = v.boolean().true();
  test('should pass validation', () => {
    expect(booleanSchema.safeValidate(true)).toEqual([]);
  });

  test('should fail validation', () => {
    expect(booleanSchema.safeValidate('hi')).toEqual([
      {
        code: 'invalid_type',
        message: 'Expected boolean, but received string'
      },
      {
        code: 'true',
        message: 'Value should be true'
      }
    ]);
  });

  test('should fail validation', () => {
    expect(booleanSchema.safeValidate(null)).toEqual([
      {
        code: 'invalid_type',
        message: 'Expected boolean, but received object'
      }
    ]);
  });

  test('should pass validation', () => {
    const nullableBool = v.boolean().nullable();
    expect(nullableBool.safeValidate(null)).toEqual([]);
  });
});
