import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { useEffect } from 'react';
import useAuthStore from '../../store/authStore';
import './Layout.css';
import '../../variables.css';

export const Layout = () => {
  const { initializeFromSession } = useAuthStore();

  useEffect(() => {
    initializeFromSession();
  }, [initializeFromSession]);

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
