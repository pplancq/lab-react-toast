import type { ToastService } from '@Front/toast/ToastService/ToastService';
import { useToastService } from '@Front/toast/useToast/useToastService';
import { useSyncExternalStore } from 'react';

export const useToastSelector = <T>(selector: (toastService: ToastService) => T) => {
  const toastService = useToastService();

  return useSyncExternalStore(
    listener => toastService.subscribe(listener),
    () => selector(toastService),
    () => selector(toastService),
  );
};
