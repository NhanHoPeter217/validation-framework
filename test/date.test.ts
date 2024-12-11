import { v } from '../src';

describe('DateSchema', () => {
    const dateSchema = v.date().min(new Date('2018-01-01')).max(new Date('2018-12-31')).optional();

    // const StringSchema2 = StringSchema.required();

    test ('should pass validation', () => {
        expect(dateSchema.safeValidate('2018-01-01')).toEqual([]);
    });
});

// let dateSchema = v.date().min(new Date('2018-01-01')).max(new Date('2018-12-31')).optional();

// console.log(dateSchema.safeValidate('false'));
