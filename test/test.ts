import { v } from 'validation-framework';

describe('NumberSchema', () => {
  const number = v.number();
  it('should parse numbers', () => {
    expect(number.parse(2)).toBe(2);
    // expect(number.moreThan(3).parse(4)).toBe(4);
    // expect(number.zero().parse(0)).toBe(0);
    // expect(number.negative().parse(-1)).toBe(-1);
    // expect(number.parse(1.1)).toBe(1.1);
    // expect(number.parse(-1.1)).toBe(-1.1);
  });
});
