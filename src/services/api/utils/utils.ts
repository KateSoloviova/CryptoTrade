export const calculateFiatAmount = (cryptoAmount: number, assetId: string, assets: any[]) => {
  const selectedAssetPrice = assets?.find(asset => asset.id === assetId)?.price || 0;
  const fiatAmount = cryptoAmount * selectedAssetPrice;
  return Number(fiatAmount.toFixed(2));
};

export const options = [
  { value: 'buy', label: 'Buy' },
  { value: 'sell', label: 'Sell' },
];