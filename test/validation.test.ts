import { NumberSchema } from 'validation-framework';

let numberSchema = new NumberSchema().min(5);

numberSchema.safeValidate(4); // false
numberSchema.safeValidate(null); // true
