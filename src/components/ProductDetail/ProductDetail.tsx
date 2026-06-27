import { type FC, useState, type MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import type { Product } from '../../interfaces/product';
import logoFallback from '../../assets/images/logo-iris.png';
import { useCart } from '../../context/CartContext';
import styles from './ProductDetail.module.css';

export const ProductDetail: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();


  const product = location.state?.product as Product;

  // Estado local por si se rompe la imagen en el detalle
  const [imgSrc, setImgSrc] = useState<string>(product?.image_link || logoFallback);
  const [isFallback, setIsFallback] = useState<boolean>(!product?.image_link);

  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  // Captura el movimiento del mouse sobre la caja de la imagen
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    
    // Calculamos el porcentaje de la posición del mouse dentro de la caja
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPos({ x, y });
    setIsZooming(true);
  };

  // Cuando el mouse sale, reseteamos la imagen a su estado normal
  const handleMouseLeave = () => {
    setIsZooming(false);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };


  if (!product) {
    return (
      <div className={styles.errorContainer}>
        <p>No se pudo cargar la información del producto.</p>
        <Button variant="link" onClick={() => navigate('/')}>Volver al Inicio</Button>
      </div>
    );
  }

  return (
    <div className={styles.detailWrapper}>

      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Volver al catálogo
      </button>

      <div className={styles.detailContainer}>

        <div className={styles.imageSection}>
          <div 
            className={styles.imageWindow}
            onMouseMove={handleMouseMove}   // Detecta el movimiento
            onMouseLeave={handleMouseLeave} // Detecta cuando sale
          >
            <img 
              src={imgSrc} 
              alt={product.name} 
              className={`${styles.mainImage} ${isFallback ? styles.fallbackActive : ''}`}
              style={{
                // Si está haciendo zoom, movemos el origen de la transformación según el mouse
                transformOrigin: isZooming ? `${zoomPos.x}% ${zoomPos.y}%` : 'center center',
                transform: isZooming ? 'scale(2)' : 'scale(1)'
              }}
              onError={() => {
                setImgSrc(logoFallback);
                setIsFallback(true);
              }}
            />
          </div>
        </div>


        <div className={styles.infoSection}>
          <span className={styles.brand}>{product.brand?.toUpperCase()}</span>
          <h1 className={styles.title}>{product.name}</h1>
          
          <p className={styles.price}>
            ${product.price ? parseFloat(product.price).toFixed(2) : '12.50'}
          </p>

          <hr className={styles.divider} />


          <div className={styles.descriptionContainer}>
            <h3>Descripción del producto</h3>
            <p className={styles.description}>
              {product.description || 'Este producto de alta calidad de Iris Perfumería resalta tu belleza natural de forma segura y duradera.'}
            </p>
            
            {product.category && (
              <p className={styles.metaItem}>
                <strong>Categoría:</strong> {product.category}
              </p>
            )}
            {product.product_type && (
              <p className={styles.metaItem}>
                <strong>Tipo de producto:</strong> {product.product_type.replace('_', ' ')}
              </p>
            )}
          </div>


          <div className={styles.cartButtonWrapper}>
            <Button variant="primary" onClick={handleAddToCart}>Agregar al carrito</Button>
          </div>
        </div>
      </div>
    </div>
  );
};