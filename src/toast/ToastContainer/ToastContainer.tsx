import { Toast } from '@Front/toast/Toast/Toast';
import { useToastSelector } from '@Front/toast/useToastSelector/useToastSelector';
import { memo } from 'react';

const ToastMemo = memo(Toast);

export const ToastContainer = () => {
  const toastIds = useToastSelector(toast => toast.getAllToastIds());

  if (toastIds.length === 0) {
    return null;
  }

  return (
    <section
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        marginTop: 16,
        marginRight: 16,
        width: 500,
      }}
    >
      {toastIds.map(id => (
        <ToastMemo id={id} key={id} />
      ))}
    </section>
  );
};
