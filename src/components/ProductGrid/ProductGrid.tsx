import type { FC } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import type { Product } from '../../interfaces/product';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: FC<ProductGridProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className={styles.noResults}>
        <p>No se encontraron productos que coincidan con tu búsqueda.</p>
      </div>
    );
  }

  return (
    <div className={styles.gridContainer}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};