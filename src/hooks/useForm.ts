import { useRef, useState } from 'react';

import { Schema } from '../lib/types/schema';
import { FieldErrors, FieldValues } from '../utils/types';
import { ErrorSubscriberType } from './error-publishing';
import { ErrorPublisher } from './error-publishing/error-publisher';

interface UseFormProps<TFieldValues extends FieldValues = FieldValues> {
  defaultValues?: TFieldValues;
  schema?: Record<string, Schema<TFieldValues>>;
  errorDisplays?: ErrorSubscriberType[];
}

interface UseFormReturn<TFieldValues extends FieldValues = FieldValues> {
  register: (
    name: keyof TFieldValues,
    // options?: ValidationOptions
    option?: Schema<TFieldValues>
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
  const errorPublisher = useRef(new ErrorPublisher<TFieldValues>(props.errorDisplays ?? []));
  const formValues = useRef<TFieldValues>(props.defaultValues ?? ({} as TFieldValues));

  const validationRules = useRef<Record<keyof TFieldValues, Schema<TFieldValues> | undefined>>(
    {} as Record<keyof TFieldValues, Schema<TFieldValues>>
  );

  const register = (name: keyof TFieldValues, options?: Schema<TFieldValues>) => {
    validationRules.current[name] = options;
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

      if (props.schema) {
        // TODO: Implement schema validation
      } else {
        const newErrors: FieldErrors<TFieldValues> = {};
        for (const key in formValues.current) {
          if (!validationRules.current[key]) {
            continue;
          }
          const errors = validationRules.current[key]?.safeValidate(formValues.current[key]);
          if (errors.length > 0) {
            newErrors[key as keyof TFieldValues] = errors;
          }
        }

        setErrors(newErrors);
        errorPublisher.current.notifySubcribers(newErrors);

        if (Object.keys(newErrors).length === 0) {
          callback(formValues.current);
        }
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
