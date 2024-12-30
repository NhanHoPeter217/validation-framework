import { FieldErrors, FieldValues } from '../utils/types';

export function ErrorList({ errors }: { errors: FieldErrors<FieldValues> }) {
  return (
    <ul style={{ listStyleType: 'disc', listStylePosition: 'inside' }}>
      {Object.keys(errors).map((name) => (
        <li key={name}>
          <span style={{ fontWeight: 'bold', marginRight: '4px' }}>{name}:</span>
          <span>{errors[name]?.join('; ')}</span>
        </li>
      ))}
    </ul>
  );
}
