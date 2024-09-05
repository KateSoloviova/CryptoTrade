import { useQuery } from 'react-query';
import { useState } from 'react';
import { getCryptoAssets } from '../../services/api/getCryptoAssets';
import { CryptoItem } from '../CryptoItem/CryptoItem';
import { Button } from '../Button/Button';
import { CryptoItemType } from '../../services/api/utils/props';
import './styles.css';

export const CryptoAssetsTable = () => {
  const { data: assets, error, isLoading } = useQuery('cryptoAssets', getCryptoAssets);
  const [itemsToShow, setItemsToShow] = useState<number>(10);
  const [expanded, setExpanded] = useState<boolean>(false);

  const [sortKey, setSortKey] = useState<'name' | 'price'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const toggleItems = () => {
    if (expanded) {
      setItemsToShow(10);
    } else if (assets) {
      setItemsToShow(assets.length);
    }
    setExpanded(!expanded);
  };

  const sortByKey = (key: 'name' | 'price') => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedAssets = assets?.slice().sort((a: CryptoItemType, b: CryptoItemType) => {
    if (sortKey === 'name') {
      return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortKey === 'price') {
      return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
    }
    return 0;
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th onClick={() => sortByKey('name')}>
              Coin Name {sortKey === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => sortByKey('price')}>
              Price {sortKey === 'price' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedAssets?.slice(0, itemsToShow).map((asset: CryptoItemType) => (
            <CryptoItem key={asset.id} asset={asset} />
          ))}
        </tbody>
      </table>

      <Button 
        text={expanded ? 'Show Less' : 'Show More'}
        onClick={toggleItems}
        variant="primary"
      />
    </div>
  );
};
