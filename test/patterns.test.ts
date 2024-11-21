import { validateEmail } from 'validation-framework';

const isValidEmail: boolean = validateEmail('test@example.com');
console.log(isValidEmail); // true
