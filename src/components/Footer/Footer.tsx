import type { FC } from 'react';
import styles from './Footer.module.css';

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        
        <p className={styles.disclaimer}>
          <strong>Aviso importante:</strong> Este sitio web es una simulación de e-commerce ficticia llamada 
          <em> Iris Perfumería y Cosmética</em>. No realiza ventas reales ni comerciales; fue desarrollado 
          exclusivamente con fines académicos y de proyecto educativo.
        </p>

        <p className={styles.credits}>
           Desarrollado por{' '}
          <a 
            href="https://andreaguinder.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.portfolioLink}
          >
            Andrea Guinder
          </a> - &copy; {currentYear} 
        </p>

      </div>
    </footer>
  );
};