import { Footer } from '@Front/components/Footer';
import { Header } from '@Front/components/Header';
import { ToastContainer } from '@Front/toast/ToastContainer/ToastContainer';
import { MainTemplate } from '@Front/ui/templates/MainTemplate';
import { Outlet } from 'react-router';

export const Layout = () => {
  return (
    <MainTemplate headerProps={{ leftComponents: <Header /> }} footerProps={{ footerContent: <Footer /> }}>
      <ToastContainer />
      <Outlet />
    </MainTemplate>
  );
};
