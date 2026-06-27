import { useEffect, useState, type FC } from 'react';
import { SearchFilter } from '../components/SearchFilter/SearchFilter';
import { ProductGrid } from '../components/ProductGrid/ProductGrid';
import type { Product } from '../interfaces/product';
import styles from './CategoryPages.module.css';

export const MaquillajePage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const safeBrands = ['maybelline', "l'oreal", 'revlon'];

  useEffect(() => {
    const fetchMaquillajeSeguro = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json');
        const data: Product[] = await response.json();
        
        const filtered = data.filter((p) => {
          const isSafeBrand = p.brand && safeBrands.includes(p.brand.toLowerCase());
          const hasImage = p.image_link && p.image_link.trim() !== '';
          const isMakeupType = p.product_type === 'lipstick' || 
                               p.product_type === 'eyeshadow' || 
                               p.product_type === 'eyeliner' || 
                               p.product_type === 'mascara';

          // Solo pasa si es de marca segura, tiene foto y es categoría maquillaje
          return isSafeBrand && hasImage && isMakeupType;
        });

        setProducts(filtered);
      } catch (error) {
        console.error("Error cargando maquillaje seguro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaquillajeSeguro();
  }, []);

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    return (
      (product.name && product.name.toLowerCase().includes(term)) ||
      (product.brand && product.brand.toLowerCase().includes(term)) ||
      (product.category && product.category.toLowerCase().includes(term))
    );
  });

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Nuestro Catálogo de Maquillaje</h1>
      
      <SearchFilter 
        value={searchTerm} 
        onChange={setSearchTerm} 
        placeholder="Buscar por marca (maybelline, l'oreal, revlon) o producto..." 
      />

      {loading ? (
        <p className={styles.loadingText}>Cargando maquillaje...</p>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
};