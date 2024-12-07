import React, { useRef, useState } from 'react';

import { FieldErrors, FieldValues } from '../utils/types';

interface ValidationOptions {
  required?: boolean | string;
  min?: number | string;
  max?: number | string;
  minLength?: number | string;
  maxLength?: number | string;
  pattern?: RegExp | string;
  validate?: (value: any) => boolean | string;
}

interface UseFormProps<TFieldValues extends FieldValues = FieldValues> {
  defaultValues?: TFieldValues;
  resolver?: (values: TFieldValues) => Promise<{ values: TFieldValues; errors: FieldErrors<TFieldValues> }>;
}

interface UseFormReturn<TFieldValues extends FieldValues = FieldValues> {
  register: (
    name: keyof TFieldValues,
    options?: ValidationOptions
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
  const formValues = useRef<TFieldValues>(props.defaultValues ?? ({} as TFieldValues));
  const validationRules = useRef<Record<keyof TFieldValues, ValidationOptions>>(
    {} as Record<keyof TFieldValues, ValidationOptions>
  );

  const register = (name: keyof TFieldValues, options: ValidationOptions = {}) => {
    validationRules.current[name] = options;
    return {
      name: name as string,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        formValues.current[name] = event.target.value as any;
      }
    };
  };

  const validateField = (name: keyof TFieldValues, value: any): string | undefined => {
    const rules = validationRules.current[name];
    if (rules) {
      if (rules.required && !value) {
        return typeof rules.required === 'string' ? rules.required : 'This field is required';
      }
      if (rules.min !== undefined && value < rules.min) {
        return `Minimum value is ${rules.min}`;
      }
      if (rules.max !== undefined && value > rules.max) {
        return `Maximum value is ${rules.max}`;
      }
      if (rules.minLength !== undefined && value.length < rules.minLength) {
        return `Minimum length is ${rules.minLength}`;
      }
      if (rules.maxLength !== undefined && value.length > rules.maxLength) {
        return `Maximum length is ${rules.maxLength}`;
      }
      if (rules.pattern && !new RegExp(rules.pattern).test(value)) {
        return `Invalid email format`;
      }
      if (rules.validate && !rules.validate(value)) {
        return typeof rules.validate === 'string' ? rules.validate : 'Invalid value';
      }
    }
  };

  const handleSubmit = (callback: (data: TFieldValues) => void) => {
    return async (event: React.FormEvent) => {
      event.preventDefault();
      if (props.resolver) {
        const { values, errors } = await props.resolver(formValues.current);
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
          callback(values);
        }
      } else {
        const newErrors: FieldErrors<TFieldValues> = {};
        for (const key in formValues.current) {
          const error = validateField(key as keyof TFieldValues, formValues.current[key]);
          if (error) {
            newErrors[key as keyof TFieldValues] = error;
          }
        }
        setErrors(newErrors);

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
