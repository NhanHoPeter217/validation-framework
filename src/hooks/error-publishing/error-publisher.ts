import { FieldErrors, FieldValues } from '~/src/utils/types';

import { ErrorSubscriber, ErrorSubscriberType } from './error-subscriber';
import { OutletSubscriber } from './outlet-subcriber';
import { ToastSubscriber } from './toast-subcriber';

class ErrorPublisher<TFieldValues extends FieldValues = FieldValues> {
  subcribers: ErrorSubscriber[] = [];
  notify: (errors: FieldErrors<TFieldValues>) => void;

  constructor(names: ErrorSubscriberType[]) {
    this.subcribers = this.getSubcribers(names);
  }

  private getSubcribers(names: ErrorSubscriberType[]): ErrorSubscriber[] {
    const subcribers: Record<ErrorSubscriberType, ErrorSubscriber | undefined> = {
      [ToastSubscriber.subscriberType]: ToastSubscriber.getInstance(),
      [OutletSubscriber.subscriberType]: OutletSubscriber.getInstance()
    };

    return names.map((name) => subcribers[name]).filter((subcriber) => subcriber !== undefined) as ErrorSubscriber[];
  }

  notifySubcribers(errors: FieldErrors<TFieldValues>) {
    this.subcribers.forEach((subcriber) => subcriber.setErrors(errors));
  }
}

export { ErrorPublisher };
