import type { ToastService } from '@Front/toast/ToastService/ToastService';
import { createContext } from 'react';

type ToastContextProps = {
  toast: ToastService;
};

export const ToastContext = createContext<ToastContextProps | null>(null);
