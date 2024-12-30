import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@radix-ui/react-toast';

import { ToastSubscriber } from '../hooks/error-publishing';
import styles from './toaster.module.css'

export function Toaster() {
  const toastSubscriber = ToastSubscriber.getInstance();
  const { toasts } = toastSubscriber.useToast();
  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast className={styles.Root} key={id} {...props}>
            <div>
              {title && <ToastTitle className={styles.Title}>{title}</ToastTitle>}
              {description && <ToastDescription className={styles.Description}>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose className={styles.Button} />
          </Toast>
        );
      })}
      <ToastViewport className={styles.Viewport} />
    </ToastProvider>
  );
}
