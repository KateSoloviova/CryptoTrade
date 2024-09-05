import { useState } from 'react';
import { useQuery } from 'react-query';
import { getCryptoAssets } from '../../services/api/getCryptoAssets';
import { Button } from '../../components/Button';
import useAuthStore from '../../store/authStore';
import { calculateFiatAmount } from '../../services/api/utils/utils';
import { DropdownMenu } from '../../components/DropdownMenu';
import { CryptoItemType } from '../../services/api/utils/props';
import './styles.css';

export const TradePage = () => {
  const { isLoggedIn } = useAuthStore();
  const { data: assets, isLoading, error } = useQuery<CryptoItemType[]>('cryptoAssets', getCryptoAssets);

  const [selectedAsset, setSelectedAsset] = useState<string>(assets?.[0]?.id || '');
  const [cryptoAmount, setCryptoAmount] = useState<number>();
  const [fiatAmount, setFiatAmount] = useState<number>();
  const [isSwapped, setIsSwapped] = useState<boolean>(false);

  const handleAssetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAsset(e.target.value);
    if (cryptoAmount) {
      const newFiatAmount = calculateFiatAmount(cryptoAmount as number, e.target.value, assets || []);
      setFiatAmount(newFiatAmount);
    }
  };

  const handleCryptoAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setCryptoAmount(value);

    const newFiatAmount = calculateFiatAmount(value, selectedAsset, assets || []);
    setFiatAmount(newFiatAmount);
  };

  const handleFiatAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setFiatAmount(value);

    const selectedAssetPrice = assets?.find(asset => asset.id === selectedAsset)?.price || 0;
    const newCryptoAmount = selectedAssetPrice !== 0 ? value / selectedAssetPrice : 0;
    setCryptoAmount(newCryptoAmount);
  };

  const handleSwap = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsSwapped(!isSwapped);
  };

  const assetOptions = assets?.map((asset: CryptoItemType) => ({
    value: asset.id,
    label: asset.symbol,
    icon: asset.icon,
  })) || [];

  if (isLoading) return <div>Loading assets...</div>;
  if (error) return <div>Error loading assets</div>;

  return (
    <div className="trade-container">
      <h1>Trade Form</h1>
      <form className="trade-form flex-container">
          <div
            className="crypto-amount-wrapper"
            style={{ order: isSwapped ? 2 : 1 }}
          >
            <input
              type="number"
              placeholder='0'
              value={cryptoAmount}
              onChange={handleCryptoAmountChange}
              disabled={!isLoggedIn || !assets}
              className="input-field"
            />

            <DropdownMenu
              options={assetOptions}
              value={selectedAsset}
              onChange={handleAssetChange}
              disabled={!isLoggedIn || !assets}
            />
          </div>
          <div
            className="crypto-amount-wrapper"
            style={{ order: isSwapped ? 1 : 2 }}
          >
            <input
              type="number"
              placeholder='0'
              id="fiatAmount"
              value={fiatAmount}
              onChange={handleFiatAmountChange}
              disabled={!isLoggedIn || !assets}
              className="input-field"
            />
            <span className="currency">USD</span>
          </div>

          <Button
            text='&#8595; &#8593;'
            variant='primary'
            disabled={!isLoggedIn || !assets}
            onClick={handleSwap}
          />
      </form>

      <Button 
          text="Submit" 
          onClick={() => {console.log('Submit button is clicked')}} 
          disabled={!isLoggedIn} 
          variant="primary" 
        />

        {!isLoggedIn && <p className="error-message">Please log in to trade.</p>}
    </div>
  );
};