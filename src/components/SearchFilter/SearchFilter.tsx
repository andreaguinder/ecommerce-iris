import type { FC, ChangeEvent } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './SearchFilter.module.css';

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchFilter: FC<SearchFilterProps> = ({ 
  value, 
  onChange, 
  placeholder = "Buscar por nombre, marca o categoría..." 
}) => {
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <FaSearch className={styles.searchIcon} />
      <input
        type="text"
        className={styles.searchInput}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
    </div>
  );
};