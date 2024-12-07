import { ChangeEvent, ComponentProps, forwardRef, useState } from 'react';

import { Schema } from '../lib/types/schema';

type InputProps = {
  validator: Schema<any>;
  label?: string;
} & ComponentProps<'input'>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ type, validator, label, onChange, ...props }, ref) => {
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);

    if (type === 'number') setErrors(validator.safeValidate(Number(e.target.value)));
    else setErrors(validator.safeValidate(e.target.value));
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {label && <label>{label}</label>}
        <input type={type} ref={ref} {...props} onChange={handleChange} />
      </div>
      {errors ? <p style={{ color: '#ED4337' }}>{errors[0]}</p> : null}
    </div>
  );
});

export { Input };
