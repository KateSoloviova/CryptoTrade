import React from 'react';
import { ButtonProps } from '../../services/api/utils/props';
import './Button.css'; 
import '../../variables.css';

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className,
}) => {
  return (
    <button
      className={`btn ${variant} ${size} ${className}`}
      disabled={disabled}
      onClick={(e) => {
        onClick && onClick(e); 
      }}
    >
      {text}
    </button>
  );
};
