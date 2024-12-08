import { v } from '../src';

describe('BooleanSchema', () => {
  const booleanSchema = v.boolean();
  test('should pass validation', () => {
    expect(booleanSchema.safeValidate(true)).toEqual([]);
  });

  test('should fail validation', () => {
    expect(booleanSchema.safeValidate('hi')).toEqual([
      { code: 'invalid_type', message: 'Expected boolean, but received string' }
    ]);
  });
});
