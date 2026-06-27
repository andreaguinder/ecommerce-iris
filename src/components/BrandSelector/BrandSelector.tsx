import { type FC } from 'react';
import styles from './BrandSelector.module.css';

interface BrandSelectorProps {
  onSelectBrand?: (brand: string) => void;
}

const POPULAR_BRANDS = [
  'maybelline',
  "l'oreal",
  'nyx',
  'clinique',
  'covergirl',
  'revlon',
  'essie',
  'e.l.f.'
];

export const BrandSelector: FC<BrandSelectorProps> = ({ onSelectBrand }) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Busca por tu marca favorita</h2>
      <div className={styles.gridContainer}>
        <ul className={styles.brandsGrid}>
          {POPULAR_BRANDS.map((brand, index) => (
            <li 
              key={index} 
              className={styles.brandCard}
              onClick={() => onSelectBrand?.(brand)}
            >
              <span className={styles.brandName}>{brand.toUpperCase()}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};