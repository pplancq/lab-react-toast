import { useToastService } from '@Front/toast/useToast/useToastService';
import { useToastSelector } from '@Front/toast/useToastSelector/useToastSelector';
import { Alert } from '@pplancq/shelter-ui-react';
import { memo } from 'react';

import '@pplancq/shelter-ui-css/css/components/alert.css';
import '@pplancq/shelter-ui-css/css/components/button.css';
import '@pplancq/shelter-ui-css/css/components/icon.css';

export type ToastProps = {
  id: number;
};

const ToastComponent = ({ id }: ToastProps) => {
  const toast = useToastSelector(t => t.getToastById(id));
  const toastService = useToastService();

  console.info('Render toast id : ', id);

  if (!toast) {
    return null;
  }

  return <Alert title={toast.message} onClose={() => toastService.removeToast(id)} />;
};

export const Toast = memo(ToastComponent);
