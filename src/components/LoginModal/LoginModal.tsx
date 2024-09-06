import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import  useAuthStore from '../../store/authStore';
import { Button } from '../Button/Button';
import { LoginModalProps } from '../../services/api/utils/props';
import './LoginModal.css';
import '../../variables.css';

export const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const { login } = useAuthStore();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
    if (errorMessage && value === '') {
      setErrorMessage(null);
    }
  };

  const handleLogin = () => {
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      setErrorMessage('Invalid email format. Please include "@" and "." in the email address.');
      return;
    }

    if (password.length < 4 || /\s/.test(password)) {
      setErrorMessage('Password must be at least 4 characters long and contain no spaces.');
      return;
    }

    const result = login(email, password);
    if (typeof result === 'string') {
      setErrorMessage(result);
    } else {
      onClose();
    }
  }

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleInputChange}
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleInputChange}
          className="input"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="modal-actions">
          <Button text="Login" onClick={handleLogin} variant="primary" />
          <Button text="Close" onClick={onClose} variant="secondary" />
        </div>
      </div>
    </div>,
    document.body
  );
};


