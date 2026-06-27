import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaTimes, FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import logoFallback from '../../assets/images/logo-iris.png';
import styles from './CartDrawer.module.css';

export const CartDrawer: FC = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <div className={styles.overlay} onClick={() => setIsCartOpen(false)}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        

        <div className={styles.header}>
          <h2>Tu Carrito</h2>
          <button className={styles.closeBtn} onClick={() => setIsCartOpen(false)}>
            <FaTimes />
          </button>
        </div>


        <div className={styles.content}>
          {cart.length === 0 ? (
            <div className={styles.emptyMessage}>
              <p>No hay productos en el carrito.</p>
            </div>
          ) : (
            cart.map(({ product, quantity }) => (
              <div key={product.id} className={styles.cartCard}>
                <img 
                  src={product.image_link || logoFallback} 
                  alt={product.name} 
                  className={styles.cartImg}
                  onError={(e) => { e.currentTarget.src = logoFallback; }}
                />
                <div className={styles.cartInfo}>
                  <span className={styles.brand}>{product.brand?.toUpperCase()}</span>
                  <h4 className={styles.name}>{product.name}</h4>
                  

                  <div className={styles.actionsRow}>
                    <div className={styles.counter}>
                      <button onClick={() => updateQuantity(product.id, 'decrement')}><FaMinus /></button>
                      <span>{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, 'increment')}><FaPlus /></button>
                    </div>
                    <button className={styles.trashBtn} onClick={() => removeFromCart(product.id)}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className={styles.priceColumn}>
                  ${((product.price ? parseFloat(product.price) : 12.50) * quantity).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>


        {cart.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>Total:</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>
            <button 
              className={styles.checkoutBtn}
              onClick={() => {
                setIsCartOpen(false);
                navigate('/checkout');
              }}
            >
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
};