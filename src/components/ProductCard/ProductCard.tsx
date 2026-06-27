import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button';
import type { Product } from '../../interfaces/product';
import logoFallback from '../../assets/images/logo-iris.png';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleViewProduct = () => {

    navigate(`/producto/${product.id}`, { state: { product } });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = logoFallback;
    e.currentTarget.style.objectFit = 'contain';
    e.currentTarget.style.padding = '1.5rem';
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={product.image_link} 
          alt={product.name} 
          className={styles.image}
          loading="lazy"
          onError={handleImageError}
        />
      </div>

      <h3 className={styles.title}>{product.name}</h3>

      <p className={styles.price}>
        ${product.price ? parseFloat(product.price).toFixed(2) : '12.50'}
      </p>

      <div className={styles.buttonWrapper}>

        <Button variant="primary" onClick={handleViewProduct}>
          Ver producto
        </Button>
      </div>
    </article>
  );
};