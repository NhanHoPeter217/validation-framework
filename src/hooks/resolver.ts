import { Schema } from '../lib/types/schema';

interface ResolverResult {
  values: Record<string, any>;
  errors: Record<string, { message: string }>;
}

export const createResolver = <T>(schema: Schema<T>) => {
  return async (values: any): Promise<ResolverResult> => {
    const errors: Record<string, { message: string }> = {};
    const validationErrors = schema.safeValidate(values);

    // // Map errors to the format expected by React Hook Form
    // validationErrors.forEach((error) => {
    //   if (error.field) {
    //     errors[error.field] = { message: error.message };
    //   }
    // });

    return {
      values: Object.keys(validationErrors).length === 0 ? values : {},
      errors
    };
  };
};

// export const yupResolver = <TFieldValues extends FieldValues>(
//   schema: Yup.ObjectSchema<TFieldValues>
// ) => {
//   return async (values: TFieldValues): Promise<{ values: TFieldValues; errors: FieldErrors<TFieldValues> }> => {
//     try {
//       const validatedValues = await schema.validate(values, { abortEarly: false });
//       return { values: validatedValues, errors: {} };
//     } catch (yupError) {
//       const errors: FieldErrors<TFieldValues> = {};
//       if (yupError.inner) {
//         yupError.inner.forEach((error: Yup.ValidationError) => {
//           errors[error.path as keyof TFieldValues] = error.message;
//         });
//       }
//       return { values, errors };
//     }
//   };
// };
