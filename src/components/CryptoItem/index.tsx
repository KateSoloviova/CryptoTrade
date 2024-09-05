import React from 'react';
import { DropdownMenu } from '../DropdownMenu';
import { CryptoItemProps } from '../../services/api/utils/props';
import { options } from '../../services/api/utils/utils';

export const CryptoItem: React.FC<CryptoItemProps> = ({ asset }) => {
  return (
    <tr>
      <td className="coin-name">
        <img src={asset.icon} alt={asset.name} className="crypto-icon" />
        {asset.name}
      </td>
      <td>${asset.price.toFixed(2)}</td>
      <td>
        <DropdownMenu options={options} />
      </td>
    </tr>
  );
};