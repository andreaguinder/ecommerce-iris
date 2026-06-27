import { type FC } from 'react';
import { ProductGridContainer } from '../components/ProductGridContainer/ProductGridContainer';

export const MaquillajePage: FC = () => {
  return (
    <main style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ color: '#B24293', fontSize: '1.8rem', marginBottom: '2rem' }}>
        Sección Maquillaje
      </h2>
      
      <ProductGridContainer brand="nyx" />
    </main>
  );
};