import { useEffect, useState, type FC } from 'react';
import { makeupService } from '../../services/makeupApi';
import { ProductGrid } from '../ProductGrid/ProductGrid';
import type { Product } from '../../interfaces/product';
import styles from './ProductGridContainer.module.css'; 

interface ProductGridContainerProps {
  brand: string;
  limit?: number;
}

export const ProductGridContainer: FC<ProductGridContainerProps> = ({ brand, limit }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await makeupService.getProducts(brand);
        

        setProducts(limit ? data.slice(0, limit) : data);
      } catch (error) {
        console.error(`Error buscando productos para la marca ${brand}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [brand, limit]);

  // 👈 ACÁ VA EL IF. Después de todos los hooks y antes de renderizar los productos
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <p className={styles.loadingText}>Buscando los mejores productos...</p>
      </div>
    );
  }

  // Si ya no está cargando, pasa de largo el IF de arriba y llega a tu grilla real
  return <ProductGrid products={products} />;
};