import { useRef, useState } from 'react';

import { ObjectSchema } from '../lib/types';
import { Schema } from '../lib/types/schema';
import { FieldErrors, FieldValues } from '../utils/types';
import { ErrorSubscriberType } from './error-publishing';
import { ErrorPublisher } from './error-publishing/error-publisher';

interface UseFormProps<TFieldValues extends FieldValues = FieldValues> {
  defaultValues?: TFieldValues;
  schema?: ObjectSchema<TFieldValues>;
  errorDisplays?: ErrorSubscriberType[];
}

interface UseFormReturn<TFieldValues extends FieldValues = FieldValues> {
  register: (
    name: keyof TFieldValues,
    option?: Schema<TFieldValues[keyof TFieldValues] | undefined>
  ) => { name: string; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void };
  handleSubmit: (callback: (data: TFieldValues) => void) => (event: React.FormEvent) => void;
  formState: {
    errors: FieldErrors<TFieldValues>;
  };
}

export function useForm<TFieldValues extends FieldValues = FieldValues>(
  props: UseFormProps<TFieldValues> = {}
): UseFormReturn<TFieldValues> {
  const [errors, setErrors] = useState<FieldErrors<TFieldValues>>({});
  const errorPublisher = useRef(props.errorDisplays ? new ErrorPublisher<TFieldValues>(props.errorDisplays) : null);
  const formValues = useRef<TFieldValues>(props.defaultValues ?? ({} as TFieldValues));

  const validationRules = useRef<Record<keyof TFieldValues, Schema<TFieldValues | undefined> | undefined>>(
    {} as Record<keyof TFieldValues, Schema<TFieldValues>>
  );

  const fields = useRef<(keyof TFieldValues)[]>([]);

  const register: UseFormReturn<TFieldValues>['register'] = (name, options) => {
    validationRules.current[name] = options;
    fields.current.push(name);
    return {
      name: name as string,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        formValues.current[name] = event.target.value as any;
      }
    };
  };

  const handleSubmit = (callback: (data: TFieldValues) => void) => {
    return async (event: React.FormEvent) => {
      event.preventDefault();

      const fieldErrors: FieldErrors<TFieldValues> = {};
      if (props.schema) {
        console.warn('Validating by schema');
        const errors = props.schema.safeValidate(formValues.current);

        for (const error of errors) {
          if (fieldErrors[error?.path.join('.') as keyof TFieldValues])
            fieldErrors[error?.path.join('.') as keyof TFieldValues]?.push(error.message);
          else fieldErrors[error?.path.join('.') as keyof TFieldValues] = [error.message];
        }
      } else {
        console.warn('Validating by field');
        for (const key of fields.current) {
          if (!validationRules.current[key]) {
            console.warn(`No validation rule for ${String(key)}`);
            continue;
          }

          const value: any = formValues.current[key];

          const errors = validationRules.current[key]?.safeValidate(value);

          if (errors.length > 0) {
            fieldErrors[key as keyof TFieldValues] = errors.map((error) => error.message);
          }
        }
      }

      if (Object.keys(fieldErrors).length === 0) {
        errorPublisher.current?.clearErrors();
        callback(formValues.current);
      } else {
        setErrors(fieldErrors);
        errorPublisher.current?.notifySubcribers(fieldErrors);
      }
    };
  };

  return {
    register,
    handleSubmit,
    formState: {
      errors
    }
  };
}
