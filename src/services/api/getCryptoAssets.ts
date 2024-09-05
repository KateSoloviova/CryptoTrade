const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

export const getCryptoAssets = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();

    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      price: item.current_price,
      price_change_24h: item.price_change_percentage_24h,
      circulating_marketcap: item.market_cap,
      symbol: item.symbol,
      icon: item.image,
    }));
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    throw error;
  }
};


