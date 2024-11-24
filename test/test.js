import { NumberSchema } from 'validation-framework';

let numberSchema = new NumberSchema().min(5).nullable().optional();

console.log(numberSchema.safeValidate(6)); // false
console.log(numberSchema.safeValidate(null)); // true
console.log(numberSchema.safeValidate(undefined)); // true
