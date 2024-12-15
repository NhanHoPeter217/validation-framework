import { FieldErrors, FieldValues } from '~/src/utils/types';

const ErrorSubscriberTypes = ['toast', 'outlet'] as const;

type ErrorSubscriberType = (typeof ErrorSubscriberTypes)[number];

abstract class ErrorSubscriber<TFieldValues extends FieldValues = FieldValues> {
  abstract setErrors(errors: FieldErrors<TFieldValues>): void;
  static readonly subscriberType: ErrorSubscriberType = '' as never;
  private static instance: ErrorSubscriber;
  static getInstance(): ErrorSubscriber {
    return this.instance;
  }
}

export { ErrorSubscriber, ErrorSubscriberType, ErrorSubscriberTypes };
