import { v } from '../src';

let dateSchema = v.date().min(new Date('2018-01-01')).max(new Date('2018-12-31')).optional();

console.log(dateSchema.safeValidate('false'));
