import { ToastContext } from '@Front/toast/ToastProvider/ToastContext';
import { ToastService } from '@Front/toast/ToastService/ToastService';
import { type PropsWithChildren, useRef } from 'react';

export type ToastProviderProps = PropsWithChildren & {
  defaultDuration?: number;
};

export const ToastProvider = ({ children, defaultDuration }: ToastProviderProps) => {
  const toastRef = useRef({ toast: new ToastService(defaultDuration) });

  return <ToastContext value={toastRef.current}>{children}</ToastContext>;
};
