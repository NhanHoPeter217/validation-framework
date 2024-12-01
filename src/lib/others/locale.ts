// Define the interface for string locale
export interface StringLocale {
  email?: string;
  match?: string;
  url?: string;
  uuid?: string;
  date?: string;
  datetime?: string;
  trim?: string;
  lowercase?: string;
  uppercase?: string;
}

// Define the interface for date locale
export interface DateLocale {
  min?: string;
  max?: string;
}

// Export a default string locale object
export const defaultStringLocale: Required<StringLocale> = {
  email: 'Invalid email format',
  match: 'String does not match the required pattern',
  url: 'Invalid URL format',
  uuid: 'Invalid UUID format',
  date: 'Invalid date format',
  datetime: 'Invalid datetime format',
  trim: 'String is not trimmed',
  lowercase: 'String must be lowercase',
  uppercase: 'String must be uppercase'
};

// Export a default date locale object
export const defaultDateLocale: Required<DateLocale> = {
  min: 'Date is below the minimum allowed date',
  max: 'Date is above the maximum allowed date'
};
