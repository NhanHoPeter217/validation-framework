import { ErrorOutlet, useForm, v } from 'validation-framework';

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<{ name: string; email: string; age: number }>({
    errorDisplays: ['outlet', 'toast']
  });

  const onSubmit = (data: { name: string; email: string; age: number }) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[600px] h-min-[800px]">
      <div>
        <label>Name</label>
        <input {...register('name', v.string().required())} />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label>Email</label>
        <input {...register('email', v.string().email().required())} />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>Age</label>
        <input
          {...register(
            'age',
            v
              .number()
              .lt(10)
              .addTest({
                name: 'custom',
                message: 'Member must not be 20 years old',
                exclusive: false,
                test: (value) => value != 20
              })
          )}
        />
        {errors.age && <span>{errors.age}</span>}
      </div>
      <button type="submit" className="mb-2">
        Submit
      </button>
      <ErrorOutlet />
    </form>
  );
}
