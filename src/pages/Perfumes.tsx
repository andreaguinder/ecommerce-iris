import { useState, type FC } from 'react';
import { SearchFilter } from '../components/SearchFilter/SearchFilter';
import { ProductGrid } from '../components/ProductGrid/ProductGrid';
import { perfumesMock } from '../data/perfumesMock';
import styles from './CategoryPages.module.css';

export const PerfumesPage: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredProducts = perfumesMock.filter((product) => {
    const term = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(term) ||
      product.brand.toLowerCase().includes(term)
    );
  });

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Perfumería Internacional</h1>
      
      <SearchFilter 
        value={searchTerm} 
        onChange={setSearchTerm} 
        placeholder="Buscar fragancias, perfumes, marcas..." 
      />

      <ProductGrid products={filteredProducts} />
    </div>
  );
};