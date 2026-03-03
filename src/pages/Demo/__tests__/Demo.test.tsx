import { ToastProvider } from '@Front/toast/ToastProvider/ToastProvider';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router';
import { Demo } from '../Demo';

describe('Demo Component', () => {
  it('should render the Demo component correctly', () => {
    const { container } = render(
      <Router>
        <ToastProvider>
          <Demo />
        </ToastProvider>
      </Router>,
    );

    expect(container).toMatchSnapshot();
  });
});
