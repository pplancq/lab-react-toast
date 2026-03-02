import { useToastService } from '@Front/toast/useToast/useToastService';
import { useToastSelector } from '@Front/toast/useToastSelector/useToastSelector';
import { Alert } from '@pplancq/shelter-ui-react';
import { memo } from 'react';

import '@pplancq/shelter-ui-css/css/components/alert.css';
import '@pplancq/shelter-ui-css/css/components/button.css';
import '@pplancq/shelter-ui-css/css/components/icon.css';

export type ToastProps = {
  id: string;
};

const ToastComponent = ({ id }: ToastProps) => {
  const toast = useToastSelector(t => t.getToastById(id));
  const toastService = useToastService();

  if (!toast) {
    return null;
  }

  const onClose = () => {
    toastService.removeToast(id);
  };

  return <Alert title={toast.message} onClose={onClose} />;
};

export const Toast = memo(ToastComponent);
