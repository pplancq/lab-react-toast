import { QueryClientProvider } from '@Front/providers/QueryClientProvider';
import { ToastProvider } from '@Front/toast/ToastProvider/ToastProvider';
import type { ComponentProps, ComponentType } from 'react';

type WithRootProps = {
  queryClient: ComponentProps<typeof QueryClientProvider>['client'];
  defaultToastDuration?: ComponentProps<typeof ToastProvider>['defaultDuration'];
};

export const withProvider = <P extends object>(Component: ComponentType<P>) => {
  const WithProvider = ({ queryClient, defaultToastDuration, ...props }: P & WithRootProps) => (
    <QueryClientProvider client={queryClient}>
      <ToastProvider defaultDuration={defaultToastDuration}>
        <Component {...(props as P)} />
      </ToastProvider>{' '}
    </QueryClientProvider>
  );

  WithProvider.displayName = `withProvider(${Component.displayName || Component.name})`;

  return WithProvider;
};
