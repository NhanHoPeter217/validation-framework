// Inspired by react-hot-toast library
import type { ToastAction, ToastProps } from '@radix-ui/react-toast';
import { createElement, useEffect, useState } from 'react';

import { ErrorList } from '~/src/components/error-list';
import { FieldErrors, FieldValues } from '~/src/utils/types';

import { ErrorSubscriber } from './error-subscriber';

type ToastActionElement = React.ReactElement<typeof ToastAction>;

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST'
} as const;

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType['ADD_TOAST'];
      toast: ToasterToast;
    }
  | {
      type: ActionType['UPDATE_TOAST'];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType['DISMISS_TOAST'];
      toastId?: ToasterToast['id'];
    }
  | {
      type: ActionType['REMOVE_TOAST'];
      toastId?: ToasterToast['id'];
    };

interface State {
  toasts: ToasterToast[];
}

type Toast = Omit<ToasterToast, 'id'>;

class ToastSubscriber extends ErrorSubscriber {
  private static _instance: ToastSubscriber | null = null;
  static getInstance() {
    if (!ToastSubscriber._instance) {
      ToastSubscriber._instance = new ToastSubscriber();
    }
    return ToastSubscriber._instance;
  }

  static override readonly subscriberType = 'toast' as const;

  private constructor() {
    super();
  }

  private count = 0;

  private genId() {
    this.count = (this.count + 1) % Number.MAX_SAFE_INTEGER;
    return this.count.toString();
  }

  private toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

  private addToRemoveQueue = (toastId: string) => {
    if (this.toastTimeouts.has(toastId)) {
      return;
    }

    const timeout = setTimeout(() => {
      this.toastTimeouts.delete(toastId);
      this.dispatch({
        type: 'REMOVE_TOAST',
        toastId: toastId
      });
    }, TOAST_REMOVE_DELAY);

    this.toastTimeouts.set(toastId, timeout);
  };

  reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'ADD_TOAST':
        return {
          ...state,
          toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
        };

      case 'UPDATE_TOAST':
        return {
          ...state,
          toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t))
        };

      case 'DISMISS_TOAST': {
        const { toastId } = action;

        // ! Side effects ! - This could be extracted into a dismissToast() action,
        // but I'll keep it here for simplicity
        if (toastId) {
          this.addToRemoveQueue(toastId);
        } else {
          state.toasts.forEach((toast) => {
            this.addToRemoveQueue(toast.id);
          });
        }

        return {
          ...state,
          toasts: state.toasts.map((t) =>
            t.id === toastId || toastId === undefined
              ? {
                  ...t,
                  open: false
                }
              : t
          )
        };
      }
      case 'REMOVE_TOAST':
        if (action.toastId === undefined) {
          return {
            ...state,
            toasts: []
          };
        }
        return {
          ...state,
          toasts: state.toasts.filter((t) => t.id !== action.toastId)
        };
    }
  }

  private listeners: ((state: State) => void)[] = [];

  memoryState: State = { toasts: [] };

  dispatch(action: Action) {
    this.memoryState = this.reducer(this.memoryState, action);
    this.listeners.forEach((listener) => {
      listener(this.memoryState);
    });
  }

  private toast({ ...props }: Toast) {
    const id = this.genId();

    const update = (props: ToasterToast) =>
      this.dispatch({
        type: 'UPDATE_TOAST',
        toast: { ...props, id }
      });
    const dismiss = () => this.dispatch({ type: 'DISMISS_TOAST', toastId: id });

    this.dispatch({
      type: 'ADD_TOAST',
      toast: {
        ...props,
        id,
        open: true,
        onOpenChange: (open) => {
          if (!open) dismiss();
        }
      }
    });

    return {
      id: id,
      dismiss,
      update
    };
  }

  useToast() {
    const [state, setState] = useState<State>(this.memoryState);

    useEffect(() => {
      this.listeners.push(setState);
      return () => {
        const index = this.listeners.indexOf(setState);
        if (index > -1) {
          this.listeners.splice(index, 1);
        }
      };
    }, [state]);

    return {
      ...state,
      toast: this.toast,
      dismiss: (toastId?: string) => this.dispatch({ type: 'DISMISS_TOAST', toastId })
    };
  }

  setErrors(errors: FieldErrors<FieldValues>): void {
    if (Object.keys(errors).length === 0) {
      this.dispatch({ type: 'REMOVE_TOAST' });
      return;
    }
    this.toast({
      title: 'Form submission failed',
      description: createElement(ErrorList, { errors })
    });
  }
}
export { ToastSubscriber };
