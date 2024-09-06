import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import  useAuthStore from '../../store/authStore';
import { LoginModal } from '../LoginModal/LoginModal';
import { Button } from '../Button/Button';
import './Header.css';

export const Header = () => {
  const { isLoggedIn, logout } = useAuthStore();
  const [isLoginModalOpen, setLoginModalOpen] = useState<boolean>(false);

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => (isActive ? 'active' : '')}
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/trade" 
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Trade
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="user-info">
        {isLoggedIn ? (
            <Button 
              text="Logout" 
              variant="primary" 
              onClick={logout} 
            />
          ) : (
            <Button 
              text="Login" 
              variant="primary" 
              onClick={() => setLoginModalOpen(true)} 
            />
          )}
        </div>
      </header>

      {isLoginModalOpen && (
        <LoginModal onClose={() => setLoginModalOpen(false)} />
      )}
    </>
  );
};

