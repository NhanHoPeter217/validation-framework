import { useState } from 'react';

import { FieldErrors, FieldValues } from '~/src/utils/types';

import { ErrorSubscriber } from './error-subscriber';

class OutletSubscriber extends ErrorSubscriber {
  private static _instance: OutletSubscriber | null = null;

  static override readonly subscriberType = 'outlet' as const;

  static override getInstance(): OutletSubscriber {
    if (!OutletSubscriber._instance) {
      OutletSubscriber._instance = new OutletSubscriber();
    }
    return OutletSubscriber._instance;
  }

  private constructor() {
    super();
  }

  private setErrorsState;

  useOutlet() {
    const [errors, setErrors] = useState<FieldErrors<FieldValues>>({});
    this.setErrorsState = setErrors;
    return { errors };
  }

  setErrors(errors: Partial<Record<string, string[]>>): void {
    if (!this.setErrorsState) {
      console.error('ErrorSubcriber: setErrorsState is not defined, please use ErrorOutlet component');
    }
    this.setErrorsState(errors);
  }
}

export { OutletSubscriber };
