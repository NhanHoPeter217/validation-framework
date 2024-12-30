import { v } from '../src';

describe('StringSchema', () => {
  const StringSchema = v.string().required();
  
  test('should pass validation', () => {
    expect(StringSchema.safeValidate(undefined)).toEqual([]);
  });
});