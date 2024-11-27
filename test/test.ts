import { v } from 'validation-framework';

describe('NumberSchema', () => {
  const number = v.number().gt(4);
  it('should parse numbers', () => {
    expect(number.safeValidate(2)).toBe([]);
    // expect(number.moreThan(3).parse(4)).toBe(4);
    // expect(number.zero().parse(0)).toBe(0);
    // expect(number.negative().parse(-1)).toBe(-1);
    // expect(number.parse(1.1)).toBe(1.1);
    // expect(number.parse(-1.1)).toBe(-1.1);
  });
});
