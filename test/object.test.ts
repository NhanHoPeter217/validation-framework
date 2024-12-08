import { v } from '../src';

const schema = v.object({
  age: v.number(),
  isStudent: v.boolean(),
  address: v.object({
    city: v.object({
      name: v.object({
        street: v.object({
          name: v.string().required()
        })
      })
    }),
    street: v.string()
  })
});

type Schema = v.infer<typeof schema>;

const obj = {
  age: 20,
  isStudent: true,
  name: 'John',
  address: {
    city: {
      name: {
        street: {
          name: 'Main Street'
        }
      }
    },
    street: 'Broadway'
  }
};

// obj.self = obj; // Circular Reference

console.log(schema.safeValidate(obj));

// Test 3: Thêm dư field vẫn ko bị lỗi, thấy yup vẫn báo lỗi nếu dư field
const schema2 = v.object({
  age: v.number().required(),
  isStudent: v.boolean(),
  address: v.object({
    city: v.object({
      name: v.object({
        street: v.object({
          name: v.string().required()
        })
      })
    }),
    street: v.string()
  })
});

describe('Test 3', () => {
  test('should pass validation', () => {
    expect(schema2.safeValidate(obj)).toEqual([]);
  });
});
