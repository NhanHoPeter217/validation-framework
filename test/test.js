import { v } from 'validation-framework';

let numberSchema = v.number().gt(5).lt(12).lt(13).gt(7).nonNullable();

console.log(numberSchema.safeValidate(8)); // false
console.log(numberSchema.safeValidate(null)); // true
console.log(numberSchema.safeValidate(undefined)); // true