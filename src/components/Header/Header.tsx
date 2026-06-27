import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHome, 
  FaBrush, 
  FaHandSparkles, 
  FaSprayCan, 
  FaShoppingCart 
} from 'react-icons/fa'; 
import logo from '../../assets/images/logo-iris.png'; 
import styles from './Header.module.css';
import { useCart } from '../../context/CartContext';

export const Header: FC = () => {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        
        <div className={styles.logoContainer}>
          <Link to="/">
            <img src={logo} alt="Iris Perfumería y Cosmética" className={styles.logo} />
          </Link>
        </div>

        <nav className={styles.navigation}>
          <ul className={styles.navLinks}>
            <li>
              <Link to="/">
                <FaHome className={styles.navIcon} />
                <span>Inicio</span>
              </Link>
            </li>
            <li>
              <Link to="/maquillaje">
                <FaBrush className={styles.navIcon} />
                <span>Maquillaje</span>
              </Link>
            </li>
            <li>
              <Link to="/unas">
                <FaHandSparkles className={styles.navIcon} />
                <span>Uñas</span>
              </Link>
            </li>
            <li>
              <Link to="/perfumes">
                <FaSprayCan className={styles.navIcon} />
                <span>Perfumes</span>
              </Link>
            </li>
          </ul>
        </nav>

        <button className={styles.cartIconContainer} onClick={() => setIsCartOpen(true)}>
          <FaShoppingCart className={styles.cartIcon} />
          {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
        </button>

      </div>
    </header>
  );
};