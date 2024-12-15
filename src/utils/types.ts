export interface FormState<T> {
  values: T;
  errors: Record<keyof T, string>;
}

export interface ValidationRule<T> {
  validate: (value: T) => boolean;
  message: string;
}

export type FieldValidation<T> = ValidationRule<T>[];
export type FieldValues = Record<string, any>;
export type FieldErrors<TFieldValues> = Partial<Record<keyof TFieldValues, string[]>>;
