import { ErrorOutlet, useForm, v } from 'validation-framework';

type FormValues = {
  name: string;
  email: string;
  age: number;
};

export default function Form() {
  const {
    register,
    handleSubmit,
  } = useForm<FormValues>({
    errorDisplays: ['outlet', 'toast']
  });

  const onSubmit = (data: FormValues) => {
    console.log("Submitted Value", data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[600px] h-min-[800px]">
      <div>
        <label>Name</label>
        <input {...register('name', v.string().required())} />
      </div>
      <div>
        <label>Email</label>
        <input {...register('email', v.string().email().required())} />
      </div>
      <div>
        <label>Age</label>
        <input
          {...register(
            'age',
            v.number()
              .lt(10)
              .addTest({
                name: 'custom',
                message: 'Member must not be 20 years old',
                exclusive: false,
                test: (value) => value != 20
              })
          )}
        />
      </div>
      <button type="submit" className="mb-2">
        Submit
      </button>
      <ErrorOutlet />
    </form>
  );
}
