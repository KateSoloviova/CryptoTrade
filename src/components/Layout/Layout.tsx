import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import './styles.css';

export const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
