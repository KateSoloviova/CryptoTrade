import React from 'react';
import { DropdownMenuProps } from '../../services/api/utils/props';
import './DropdownMenu.css';

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ options, value, onChange, disabled }) => {
  return (
    <select className="dropdown-menu" value={value} onChange={onChange} disabled={disabled}>

      {options.map((option) => (
        <option key={option.value} value={option.value}>          
          {option.label}
        </option>
      ))}
    </select>
  );
};

