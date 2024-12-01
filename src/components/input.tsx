import { ChangeEvent, ComponentProps, forwardRef, useState } from 'react';

import { Schema } from '../lib/types/schema';

type InputProps = {
  validator: Schema<any>;
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
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);

    if (type === 'number') setErrors(validator.safeValidate(Number(e.target.value)));
    else setErrors(validator.safeValidate(e.target.value));
  };

  // use schema o day
  //  state chua value
  //  state chua error
  // onchange thi validate

  return (
    <div>
      <input type={type} ref={ref} {...props} onChange={handleChange} />
      {errors ? (
        <>
          {errors.map((error, index) => {
            return <span key={index}>{error}</span>;
          })}
        </>
      ) : null}
    </div>
  );
});

export { Input };