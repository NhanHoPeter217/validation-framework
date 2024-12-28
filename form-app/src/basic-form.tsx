import { ErrorOutlet, useForm, v } from 'validation-framework';

const validationSchema = v
  .object({
    firstName: v.string().required(),
    lastName: v.string().max(5).required(),
    min: v.number().gte(10),
    max: v.number().lte(20),
    minDate: v.date().min('2019-08-01'),
    maxDate: v.date().max('2019-08-01'),
    minLength: v.string().min(2),
    minRequiredLength: v.string().min(2).required(),
    // selectNumber: v.string().required(),
    pattern: v.string().matches(/\d+/)
    // radio: v.string().required(),
    // checkbox: v.string().required()
  })
  .required();

type FormValues = v.infer<typeof validationSchema>;

const BasicSchemaValidation: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    schema: validationSchema,
    errorDisplays: ['outlet']
  });

  const onSubmit = (data: FormValues) => {
    console.log('Submitted Value', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('firstName')} placeholder="firstName" />
      {errors.firstName && <p>firstName error</p>}
      <input {...register('lastName')} placeholder="lastName" />
      {errors.lastName && <p>lastName error</p>}
      <input type="number" {...register('min')} placeholder="min" />
      {errors.min && <p>min error</p>}
      <input type="number" {...register('max')} placeholder="max" />
      {errors.max && <p>max error</p>}
      <input type="date" {...register('minDate')} placeholder="minDate" />
      {errors.minDate && <p>minDate error</p>}
      <input type="date" {...register('maxDate')} placeholder="maxDate" />
      {errors.maxDate && <p>maxDate error</p>}
      <input {...register('minLength')} placeholder="minLength" />
      {errors.minLength && <p>minLength error</p>}
      <input {...register('minRequiredLength')} placeholder="minRequiredLength" />
      {errors.minRequiredLength && <p>minRequiredLength error</p>}
      <button type="submit">Submit</button>
      <ErrorOutlet />
    </form>
  );
};

export default BasicSchemaValidation;
