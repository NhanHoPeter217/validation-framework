import { v } from '../src';

const schema2 = v.object({
  information: v.object({
    name: v.string().required(),
    age: v.number(),
    isStudent: v.boolean(),
    address: v.object({
    city: v.number().nullable().lt(100),
      street: {
        road: v.string().required()
      }
    })
  }),
  hello: {
    world: v.string(),
    team: v.number()
  },
  extra: v.string()
});

describe('ObjectSchema', () => {
  const errors = schema2.safeValidate({
    information: {
      name: 'abc',
      age: 25,
      isStudent: true,
      address: {
        city: 100,
        street: {
          road: ''
        }
      }
    },
    hello: {
      world: 'hello',
      team: 123
    },
    extra: 'extra'
  });
  console.log(errors);
});
