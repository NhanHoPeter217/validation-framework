// import { v } from '../src';

// describe('ObjectSchema', () => {
//   // const schema = v.object({
//   //   name: v.string().required(),
//   //   age: v.number(),
//   //   isStudent: v.boolean(),
//   //   address: v.object({
//   //     city: v.number().nullable(),
//   //     street: v.string().required()
//   //   })
//   // });

//   // type type = v.infer<typeof schema>;
//   // const value: type = {
//   //   name: undefined,
//   //   age: 25,
//   //   isStudent: true,
//   //   address: {
//   //     city: undefined,
//   //     street: '123 Elm St'
//   //   }
//   // };
//   // const schema2 = v.object({
//   //   // information: schema,
//   //   hello: {
//   //     world: v.string(),
//   //     team: v.number()
//   //   },
//   //   extra: v.string()
//   // });

//   // const circularObject: any = {
//   //   name: 'John Doe',
//   //   age: 25,
//   //   isStudent: true,
//   //   address: {
//   //     city: 12345,
//   //     street: '123 Elm St'
//   //   }
//   // };
//   // type schemaha = v.infer<typeof schema2>;
//   // const pickAddressAndName = schema.pick({ name: true, address: true });
//   // type PickAddressAndName = v.infer<typeof pickAddressAndName>;
//   // const omitAge = schema.omit({ age: true });
//   // type OmitAge = v.infer<typeof omitAge>;

//   // const extendSchema = schema.extend({ extra: v.string() });
//   // type ExtendSchema = v.infer<typeof extendSchema>;
//   // const partialSchema = schema.partial({ name: true });
//   // type PartialSchema = v.infer<typeof partialSchema>;
//   // const extendSchemaValue: ExtendSchema = {
//   //   name: 'John Doe',
//   //   age: 25,
//   //   isStudent: true,
//   //   address: {
//   //     city: 12345,
//   //     street: '123 Elm St'
//   //   },
//   //   extra: 'extra'
//   // };

//   // Test for missing required field
//   // test('should pass validation', () => {
//   //   expect(
//   //     schema.safeValidate({
//   //       name: 'John Doe'
//   //     })
//   //   ).toEqual([]);
//   // });

//   // Circular reference test
//   // test('should detect circular reference error', () => {
//   //   // Create an object with a circular reference
//   //   // const circularObject: any = {};
//   //   circularObject.self = circularObject;

//   //   // Attempt to validate the object with the schema
//   //   const result = schema.safeValidate(circularObject);

//   //   // Check for validation errors specifically related to circular references
//   //   expect(result).toEqual([
//   //       {
//   //         code: 'circular_reference',
//   //         message: 'Circular reference detected',
//   //       },
//   //   ]);
//   // });

//   // Test for nested schema and nested object => nested schema is fine
//   // but nested object is not (nested object in here is the field 'hello')
//   // test('should pass validation', () => {
//   //   const schemaA = v.object({
//   //     city: v.number(),
//   //     street: v.string()
//   //   });
//   //   const mergeSchema = schema.merge(schema2);
//   //   type MergeSchema = v.infer<typeof mergeSchema>;
//   //   console.log(mergeSchema);
//   //   const number = v.number().required();
//   //   type numberHehe = v.infer<typeof number>;
//   //   expect(
//   //     schema2.safeValidate({
//   //       information: {
//   //         name: 'John Doe',
//   //         age: 25,
//   //         isStudent: true,
//   //         address: {
//   //           city: 12345,
//   //           street: '123 Elm St'
//   //         }
//   //       },
//   //       hello: {
//   //         world: 'hello',
//   //         team: 123
//   //       },
//   //       extra: 'extra'
//   //     })
//   //   );
//   // });

//   // test('should pass validation', () => {
//   //   expect(schema.safeValidate(value)).toEqual([]);
//   // });

//   const ObjectSchema = v.object({
//     name: v.string().required(),
//     age: v.number(),
//     isStudent: v.boolean(),
//     address: v.object({
//       city: v.number().nullable(),
//       street: v.string().required()
//     })
//   });

//   test('should pass validation', () => {
//     expect(
//       ObjectSchema.safeValidate({
//         name: undefined,
//         age: 25,
//         isStudent: true,
//         address: {
//           city: undefined,
//           street: '123 Elm St'
//         }
//       })
//     ).toEqual([]);
//   });
// });
