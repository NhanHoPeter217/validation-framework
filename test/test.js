import { NumberSchema } from 'validation-framework';

let numberSchema = new NumberSchema().min(5).max(12).max(13).min(7).nonNullable();

console.log(numberSchema.safeValidate(5)); // false
console.log(numberSchema.safeValidate(null)); // true
console.log(numberSchema.safeValidate(undefined)); // true