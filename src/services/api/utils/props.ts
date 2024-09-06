export interface ButtonProps {
  text: string; 
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; 
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
}

export interface CryptoItemType {
  id: string;
  name: string;
  price: number;
  icon: string;
  price_change_24h: number;
  circulating_marketcap: number;
}

export interface CryptoItemProps {
  asset: {
    id: string;
    name: string;
    price: number;
    price_change_24h: number;
    circulating_marketcap: number;
    icon: string;
  };
}

export interface DropdownMenuProps {
  options: OptionProp[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

export interface OptionProp {
  value: string;
  label: string;
}

export interface LoginModalProps {
  onClose: () => void;
}

export interface CryptoItemType {
  id: string;
  name: string;
  price: number;
  icon: string;
  symbol: string;
  price_change_24h: number;
  circulating_marketcap: number;
}