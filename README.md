# 🍞 lab-react-toast

A laboratory project to experiment with a toast notification system powered by [`useSyncExternalStore`](https://react.dev/reference/react/useSyncExternalStore).

## 📋 About

This project is a lab for exploring and experimenting with a toast notification system using React's `useSyncExternalStore` hook. The goal is to test different approaches to create a performant and reactive notification system by leveraging React's external store subscription pattern.

The toast system is fully implemented in [`src/toast/`](./src/toast/).

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/pplancq/lab-react-toast.git
cd lab-react-toast

# Install dependencies
npm install

# Start the application in development mode
npm start
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

## 🎯 Using the Toast System

### 1. Setup the Provider

Wrap your application with the `ToastProvider`:

```tsx
import { ToastProvider } from '@Front/toast/ToastProvider/ToastProvider';

function App() {
  return <ToastProvider defaultDuration={3000}>{/* Your application */}</ToastProvider>;
}
```

### 2. Add the Toast Container

Add the `ToastContainer` to your layout:

```tsx
import { ToastContainer } from '@Front/toast/ToastContainer/ToastContainer';

function Layout() {
  return (
    <div>
      {/* Your content */}
      <ToastContainer />
    </div>
  );
}
```

### 3. Use Toasts in Your Components

```tsx
import { useToastService } from '@Front/toast/useToast/useToastService';

function MyComponent() {
  const toastService = useToastService();

  const handleClick = () => {
    // Add a toast with default duration
    toastService.addToast('Notification message!');

    // Add a toast with custom duration
    toastService.addToast('Important message', 5000);
  };

  return <button onClick={handleClick}>Show Toast</button>;
}
```

### ToastService API

- `addToast(message: string, duration?: number)`: Adds a new toast
- `removeToast(id: number)`: Removes a toast by its ID
- `getAllToastIds()`: Gets all active toast IDs
- `getToastById(id: number)`: Gets a toast by its ID

### ⚠️ Note about `global.__toastService`

The `global.__toastService` in `ToastProvider.tsx` is **for debugging purposes only** to quickly test the toast system from the browser console. It should not be used in production.

```js
// In the browser console (debug only)
__toastService.addToast('Test from console');
```

## 🏗️ Toast System Architecture

The system is based on the Observer pattern with `useSyncExternalStore`:

```
📁 src/toast/
├── 📁 AbstractObserver/      # Abstract class for Observer pattern
├── 📁 Toast/                 # Individual toast display component
├── 📁 ToastContainer/        # Toast container component
├── 📁 ToastProvider/         # React Provider for context
├── 📁 ToastService/          # Toast management service
├── 📁 useToast/              # Hook to access the service
└── 📁 useToastSelector/      # Hook with useSyncExternalStore
```

## 📜 Available Scripts

### `npm start`

Launches the application in development mode.

### `npm test`

Runs all tests (unit and e2e).

### `npm run test:unit`

Runs unit tests with Vitest.

### `npm run test:e2e`

Runs end-to-end tests with Playwright.

### `npm run build`

Builds the application for production.

### `npm run lint`

Checks for lint errors without fixing them.

### `npm run lint:eslint:fix`

Automatically fixes ESLint errors.

## 🛠️ Technologies

- **React** with TypeScript
- **useSyncExternalStore** for external state management
- **Rsbuild** for bundling
- **Vitest** for unit testing
- **Playwright** for e2e testing

## 📚 Resources

- [React Documentation - useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)
- [React Documentation](https://react.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
