import { type FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductGridContainer } from '../../components/ProductGridContainer/ProductGridContainer';
import { Button } from '../../components/Button/Button';
import styles from './BrandPage.module.css';

export const BrandPage: FC = () => {
  const { brandName } = useParams<{ brandName: string }>(); 
  const navigate = useNavigate();

  if (!brandName) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>Marca no encontrada</p>
        <Button variant="link" onClick={() => navigate('/')}>
          Volver al Inicio
        </Button>
      </div>
    );
  }

  return (
    <main className={styles.brandPageContainer}>
      

      <div className={styles.backButtonWrapper}>
        <Button variant="link" onClick={() => navigate(-1)}>
          ← Volver atrás
        </Button>
      </div>


      <h2 className={styles.title}>
        Productos de {brandName}
      </h2>
      

      <ProductGridContainer brand={brandName} />
    </main>
  );
};