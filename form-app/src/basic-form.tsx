import { ErrorOutlet, useForm, v } from 'validation-framework';

const validationSchema = v
  .object({
    firstName: v.string().required().email().nonEmpty().lowercase(),
    lastName: v
      .string()
      .max(20)
      .required()
      .addTest({
        name: 'My custom test',
        exclusive: true,
        test(value) {
          if (value === 'my custom test') return true;
          return false;
        },
        message: 'Failing Custom test'
      }),
    min: v.number().gte(10),
    max: v.number().lte(20),
    minDate: v.date().min('2019-08-01'),
    maxDate: v.date().max(new Date()),
    minLength: v.string().min(2),
    minRequiredLength: v.string().min(2).required(),
    regexPattern: v.string().matches(/\d+/)
  })
  .required();

type FormValues = v.infer<typeof validationSchema>;

const BasicSchemaValidation: React.FC = () => {
  const { register, handleSubmit } = useForm<FormValues>({
    schema: validationSchema,
    errorDisplays: ['outlet']
  });

  const onSubmit = (data: FormValues) => {
    console.log('Submitted Value', data);
    alert('Submitted successfully: ' + JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('firstName')} placeholder="Kết hợp các validation với nhau cho cùng kiểu dữ liệu" />
      <input {...register('lastName')} placeholder="Custom Validation" />
      <input {...register('regexPattern')} placeholder="Regex Pattern" />
      <input type="number" {...register('min')} placeholder="min" />
      <input type="number" {...register('max')} placeholder="max" />
      <input type="date" {...register('minDate')} placeholder="minDate" />
      <input type="date" {...register('maxDate')} placeholder="maxDate" />
      <input {...register('minLength')} placeholder="minLength" />
      <input {...register('minRequiredLength')} placeholder="minRequiredLength" />
      <button type="submit">Submit</button>
      <ErrorOutlet />
    </form>
  );
};

export default BasicSchemaValidation;
