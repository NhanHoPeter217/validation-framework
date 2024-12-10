import { v } from '../src';

describe('ObjectSchema', () => {
    const schema = v.object({
        name: v.string(),
        age: v.number(),
        isStudent: v.boolean(),
        address: v.object({
            city: v.number(),
            street: v.string()
        })
    });

    const schema2 = v.object({
        information: schema,
        hello: {
            world: v.string(),
            team: v.number()
        },
        extra: v.string(),
    })

    const circularObject: any = {
        name: 'John Doe',
        age: 25,
        isStudent: true,
        address: {
            city: 12345,
            street: '123 Elm St'
        }
    };

    // Test for missing required field
    // test('should pass validation', () => {
    //     expect(schema.safeValidate({
    //         name: 'John Doe'
    //     })).toEqual([]);
    // });

    // Circular reference test
    // test('should detect circular reference error', () => {
    //   // Create an object with a circular reference
    //   // const circularObject: any = {};
    //   circularObject.self = circularObject;
  
    //   // Attempt to validate the object with the schema
    //   const result = schema.safeValidate(circularObject);
  
    //   // Check for validation errors specifically related to circular references
    //   expect(result).toEqual([
    //       {
    //         code: 'circular_reference',
    //         message: 'Circular reference detected',
    //       },
    //   ]);
    // });

    // Test for nested schema and nested object => nested schema is fine
    // but nested object is not (nested object in here is the field 'hello')
    test('should pass validation', () => {
        expect(schema2.safeValidate({
            information: {
                name: 'John Doe',
                age: 25,
                isStudent: true,
                address: {
                    city: 12345,
                    street: '123 Elm St'
                }
            },
            hello: {
                world: 'hello',
                team: 123
            },
            extra: 'extra'
        })).toEqual([]);
    });
});