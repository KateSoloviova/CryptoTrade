import React from 'react';
import { ButtonProps } from '../../services/api/utils/props';
import './styles.css'; 

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
}) => {
  return (
    <button
      className={`btn ${variant} ${size}`}
      disabled={disabled}
      onClick={(e) => {
        onClick && onClick(e); 
      }}
    >
      {text}
    </button>
  );
};
