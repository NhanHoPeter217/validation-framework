import { v } from '../src';

let stringSchema = v.string();

console.log(stringSchema.safeValidate(-12)); // false
