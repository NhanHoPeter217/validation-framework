import { v } from 'validation-framework';

const schema = v.object({
  // name: v.string().required(),
  age: v.number().required(),
  isStudent: v.boolean().required(),
  address: v
    .object({
      city: v.number().required(),
      street: v.number().required()
    })
    .required()
});

console.log(schema.safeValidate({ age: '30', isStudent: 'haha', address: { city: 'haha', street: 2 } })); // true

// const pickAge = schema.pick({ age: true });

// console.log(pickAge.safeValidate({ age: '20' })); // true

// let boolean = v.boolean();
// let numberSchema = v.object({
//   name: v.number()
// });
// let numberSchema2 = v.object({
//   number: v.number().nullable(),
//   boolean: v.boolean()
// });
// // console.log(numberSchema.shape);
// // console.log(numberSchema.merge(numberSchema2).shape);
// const pickNameSchema = numberSchema2.pick({ number: true });
// console.log(pickNameSchema);
// const infer = v.
// console.log(numberSchema.extend(numberSchema2).shape);

// console.log(numberSchema.safeValidate({ name: 11 })); // true

// console.log(numberSchema.safeValidate(8)); // false
// console.log(numberSchema.safeValidate(null)); // true
// console.log(numberSchema.safeValidate(undefined)); // true
