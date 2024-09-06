import { CryptoAssetsTable } from '../../components/CryptoAssetsTable/CryptoAssetsTable';
import './HomePage.css';
import '../../variables.css';

export const HomePage = () => {
  return (
    <div>
      <h1>Crypto Assets</h1>
        <CryptoAssetsTable />
    </div>   
  );
};
