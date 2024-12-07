import { ChangeEvent, ComponentProps, forwardRef, useState } from 'react';

import { Schema } from '../lib/types/schema';
import { Error } from '../lib/errors';

type InputProps = {
  validator: Schema<any>;
  label?: string;
} & ComponentProps<'input'>;

//Create a template <T> where T is the type of the value
//Create a state for the value
//Create a state for the error
//Create a ref for the input
//Create a function to validate the value
//Create a function to update the value
//Create a function to update the error
//Return an input element with the ref and props

const Input = forwardRef<HTMLInputElement, InputProps>(({ type, validator, onChange, ...props }, ref) => {
  const [errors, setErrors] = useState<Error[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);

    if (type === 'number') setErrors(validator.safeValidate(Number(e.target.value)));
    else setErrors(validator.safeValidate(e.target.value));
  };

  return (
    <div>
      <input type={type} ref={ref} {...props} onChange={handleChange} />
      {Array.isArray(errors) && errors.length > 0 ? (
        <>
          {errors.map((error: Error, index: number) => {
            return <span key={index}>{error.message}</span>;
          })}
        </>
      ) : null}
    </div>
  );
});

export { Input };
