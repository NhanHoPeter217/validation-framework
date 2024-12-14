import { v } from '../src';

describe('StringSchema', () => {
  const StringSchema = v.string().required();
  test('should pass validation', () => {
    expect(StringSchema.safeValidate('hi')).toEqual([]);
  });

  test('should fail validation', () => {
    expect(StringSchema.safeValidate('')).toEqual([
      { code: 'empty possibility', message: 'The value must not be an empty string' }
    ]);
  });
});
