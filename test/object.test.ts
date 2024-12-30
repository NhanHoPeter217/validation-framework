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

  type a = v.infer<typeof schema>;
  const value: a = {
    name: undefined,
    age: 25,
    isStudent: true,
    address: {
      city: undefined,
      street: '123 Elm St'
    }
  };
  const schema2 = v.object({
    // information: schema,
    hello: {
      world: v.string(),
      team: v.number()
    },
    extra: v.string()
  });

  test('Missing required field: should pass validation', () => {
    expect(
      schema.safeValidate({
        name: 'John Doe'
      })
    ).toEqual([]);
  });

  // Test for nested schema and nested object => nested schema is fine
  // but nested object is not (nested object in here is the field 'hello')
  test('Nested schema: should pass validation', () => {
    expect(
      schema2.safeValidate({
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
      })
    );
  });

  test('should pass validation', () => {
    expect(schema.safeValidate(value)).toEqual([]);
  });

  const ObjectSchema = v.object({
    name: v.string().required(),
    age: v.number(),
    isStudent: v.boolean(),
    address: v.object({
      city: v.number().nullable(),
      street: v.string().required()
    })
  });

  test('should pass validation', () => {
    expect(
      ObjectSchema.safeValidate({
        name: undefined,
        age: 25,
        isStudent: true,
        address: {
          city: undefined,
          street: '123 Elm St'
        }
      })
    ).toEqual([
      {
        code: 'optionality',
        message: 'Required',
        path: ['name']
      },
      {
        code: 'invalid_type',
        message: 'Expected string, but received undefined',
        path: ['name']
      }
    ]);
  });
});
