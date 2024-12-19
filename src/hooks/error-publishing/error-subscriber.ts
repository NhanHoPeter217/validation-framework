import { FieldErrors, FieldValues } from '~/src/utils/types';

const ErrorSubscriberTypes = ['toast', 'outlet'] as const;

type ErrorSubscriberType = (typeof ErrorSubscriberTypes)[number];

abstract class ErrorSubscriber<TFieldValues extends FieldValues = FieldValues> {
  abstract setErrors(errors: FieldErrors<TFieldValues>): void;
  static readonly subscriberType: ErrorSubscriberType = '' as never;
}

export { ErrorSubscriber, ErrorSubscriberType, ErrorSubscriberTypes };
