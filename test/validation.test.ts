import { v } from 'validation-framework';

describe('NumberSchema', () => {
  let numberSchema = v.number().gt(0).lt(10);
  let stringg = v.string().max(10);
  let date = v.date().min(625276800000).max('2021-12-30');
  // test('should pass validation', () => {
  //   expect(numberSchema.safeValidate(5)).toEqual([]);
  // });

  // test('should fail validation', () => {
  //   expect(numberSchema.safeValidate(15)).toEqual([
  //     {
  //       message: 'Value must be less than 10'
  //     }
  //   ]);
  // });

  test('should pass validation', () => {
    expect(date.safeValidate("1989-12-01T00:00:00+05:00")).toEqual([]);
  });
});
