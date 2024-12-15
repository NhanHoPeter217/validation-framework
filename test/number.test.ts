import { v } from '../src/index';

describe('NumberSchema', () => {
  const numberSchema = v.number();
  // const number?: number = 5;
  // test('should pass validation', () => {
  //   expect(numberSchema.safeValidate(number)).toEqual([]);
  // });

  // test('should fail validation', () => {
  //   expect(numberSchema.safeValidate(15)).toEqual([{ code: 'lt', message: 'Value should be less than 10' }]);
  // });
});
