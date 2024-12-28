import { ErrorOutlet, useForm, v } from 'validation-framework';

export default function FormValidatedBySchema() {
  const schema = v.object({
    name: v.string().required(),
    age: v.number().gt(16),
    isStudent: v.boolean().required(),
    address: v.string(),
    email: v.string().email().required()
  });

  type FormValues = v.infer<typeof schema>;

  const { register, handleSubmit } = useForm<FormValues>({
    errorDisplays: ['outlet', 'toast'],
    schema
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[600px] h-min-[800px]">
      <div>
        <label>Name</label>
        <input {...register('name')} />
      </div>
      <div>
        <label>Email</label>
        <input {...register('email')} />
      </div>
      <div>
        <label>Age</label>
        <input {...register('age')} />
      </div>
      <div>
        <label>Address</label>
        <input {...register('address')} />
      </div>
      <button type="submit" className="mb-2">
        Submit
      </button>
      <ErrorOutlet />
    </form>
  );
}
