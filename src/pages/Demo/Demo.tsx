import { useToastService } from '@Front/toast/useToast/useToastService';
import classes from './Demo.module.scss';

export const Demo = () => {
  const toastService = useToastService();

  return (
    <div className={classes.container}>
      <div className={classes.bigTitleStyle}>React Toast Lab</div>

      <div className={classes.paragraphContainer}>
        <h1 className={classes.titleStyle}>About this Lab</h1>
        <div className={classes.infoSection}>
          <p className={classes.paragraphStyle}>
            This project is a small React lab created to experiment with a toast notification system implemented using
            an observer pattern, a dedicated toast service, and React's <code>useSyncExternalStore</code> hook for
            subscribing components to the service's state.
          </p>
          <p className={classes.paragraphStyle}>
            Responsibilities are separated: <code>ToastService</code> manages toast lifecycle and state,{' '}
            <code>AbstractObserver</code> provides subscribe/notify mechanics, and components access the service through{' '}
            <code>useToastService</code> and read state via <code>useToastSelector</code>.
          </p>
        </div>
      </div>

      <div className={classes.paragraphContainer}>
        <h1 className={classes.titleStyle}>Usage Example</h1>
        <div className={classes.infoSection}>
          <p className={classes.paragraphStyle}>Example of adding a toast from a component:</p>
          <div className={classes.infoSection}>
            <pre className={classes.paragraphStyle}>
              {`const toastService = useToastService();

return (
  <section>
    <button
      type="button"
      onClick={() => {
        toastService.addToast('Notification message!');
      }}
    >
      Add toast
    </button>
  </section>
);`}
            </pre>
          </div>
          <div className={classes.infoSection}>
            <p className={classes.paragraphStyle}>Live demo:</p>
            <section>
              <button
                type="button"
                onClick={() => {
                  toastService.addToast('Notification from Demo page!');
                }}
              >
                Show demo toast
              </button>
            </section>
          </div>
          <p className={classes.paragraphStyle}>
            Note: To access <code>toastService</code> the component must be rendered inside the{' '}
            <code>ToastProvider</code> context. The provider exposes the service so <code>useToastService()</code> can
            retrieve it.
          </p>
        </div>
      </div>

      <div className={classes.paragraphContainer}>
        <h1 className={classes.titleStyle}>Key Files</h1>
        <div className={classes.infoSection}>
          <ul>
            <li className={classes.paragraphStyle}>src/toast/AbstractObserver/AbstractObserver.ts — observer base</li>
            <li className={classes.paragraphStyle}>
              src/toast/ToastService/ToastService.ts — toast management service
            </li>
            <li className={classes.paragraphStyle}>
              src/toast/useToast/useToastService.ts — hook to access the service
            </li>
            <li className={classes.paragraphStyle}>
              src/toast/useToastSelector/useToastSelector.ts — selector using useSyncExternalStore
            </li>
            <li className={classes.paragraphStyle}>
              src/toast/ToastProvider/ToastProvider.tsx — context provider and container
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
