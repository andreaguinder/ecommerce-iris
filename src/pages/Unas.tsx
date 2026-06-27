import { useEffect, useState, type FC } from 'react';
import { SearchFilter } from '../components/SearchFilter/SearchFilter';
import { ProductGrid } from '../components/ProductGrid/ProductGrid';
import type { Product } from '../interfaces/product';
import styles from './CategoryPages.module.css';

export const UnasPage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const safeNailBrands = ['maybelline', 'revlon', 'essie', 'orly'];

  useEffect(() => {
    const fetchTodosLosEsmaltes = async () => {
      try {
        setLoading(true);

        const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json?product_type=nail_polish');
        const data: Product[] = await response.json();
        
        const filtered = data.filter((p) => {
          return p.brand && safeNailBrands.includes(p.brand.toLowerCase());
        });

        setProducts(filtered);
      } catch (error) {
        console.error("Error cargando el catálogo de uñas ampliado:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodosLosEsmaltes();
  }, []);

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    return (
      (product.name && product.name.toLowerCase().includes(term)) ||
      (product.brand && product.brand.toLowerCase().includes(term))
    );
  });

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Esmaltes y Cuidado de Uñas</h1>
      
      <SearchFilter 
        value={searchTerm} 
        onChange={setSearchTerm} 
        placeholder="Buscar esmaltes por nombre o marca (essie, orly, revlon, maybelline)..." 
      />

      {loading ? (
        <p className={styles.loadingText}>Cargando catálogo completo de uñas...</p>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
};