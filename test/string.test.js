import { v } from 'validation-framework';

let stringSchema = v.string();

console.log(stringSchema.safeValidate(-12)); // false
