import { CryptoAssetsTable } from '../../components/CryptoAssetsTable';
import './styles.css';

export const HomePage = () => {
  return (
    <div>
      <h1>Crypto Assets</h1>
        <CryptoAssetsTable />
    </div>   
  );
};
