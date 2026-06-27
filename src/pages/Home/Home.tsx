import { useEffect, useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from '../../components/Carousel/Carousel';
import { makeupService } from '../../services/makeupApi';
import type { Product } from '../../interfaces/product';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { BrandSelector } from '../../components/BrandSelector/BrandSelector'; 
import { perfumesMock } from '../../data/perfumesMock';
import styles from './Home.module.css';

import bannerPrincipal from '../../assets/images/banner-carrousel-portada.png';
import bannerMaquillaje from '../../assets/images/banner-carrousel-maquillajes.png';
import bannerEsmaltes from '../../assets/images/banner-carrousel-esmaltes.png';
import bannerPerfumes from '../../assets/images/banner-carrousel-perfumes.png';

const HOME_BANNERS = [
  { src: bannerPrincipal, alt: 'Iris Perfumería y Cosmética Original' },
  { src: bannerMaquillaje, alt: 'Maquillajes para todo tipo de piel', positionTop: true },
  { src: bannerEsmaltes, alt: 'Esmaltes y uñas perfectas', positionTop: true },
  { src: bannerPerfumes, alt: 'Fragancias y perfumes importados', positionTop: true }
];

export const Home: FC = () => {
    const navigate = useNavigate();
    const [makeupProducts, setMakeupProducts] = useState<Product[]>([]);
    const [nailProducts, setNailProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                setLoading(true);

                const [makeupData, essieNails, revlonNails, maybellineNails, orlyNails] = await Promise.all([
                    makeupService.getProducts('maybelline'),
                    makeupService.getProducts('essie'),
                    makeupService.getProducts('revlon'),
                    makeupService.getProducts('maybelline'),
                    makeupService.getProducts('orly')
                ]);

                const filteredMakeup = makeupData.filter(
                    (p) => p.product_type === 'lipstick' || p.product_type === 'eyeshadow' || p.product_type === 'eyeliner' || p.product_type === 'mascara'
                );

                const allNailData = [...essieNails, ...revlonNails, ...maybellineNails, ...orlyNails];
                const filteredNails = allNailData.filter((p) => p.product_type === 'nail_polish');

                setMakeupProducts(filteredMakeup);
                setNailProducts(filteredNails); 
            } catch (error) {
                console.error("Error cargando los datos de la Home:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHomeData();
    }, []);


    const handleBrandSelect = (brand: string) => {
        navigate(`/brand/${brand.toLowerCase()}`); 
    };

    return (
        <div className={styles.homeContainer}>

            {/* CAROUSEL DE BANNERS */}
            <Carousel slidesPerViewDesktop={1} slidesPerViewMobile={1} slidesPerViewTablet={1} autoPlayDelay={4000}>
                {HOME_BANNERS.map((banner, index) => {
                    const imageClass = `${styles.bannerImage} ${banner.positionTop ? styles.positionTop : ''}`;

                    return (
                        <div key={index} className={styles.bannerSlide}>
                            <img 
                                src={banner.src} 
                                alt={banner.alt} 
                                className={imageClass}
                            />
                        </div>
                    );
                })}
            </Carousel>

            {loading ? (
                <p style={{ textAlign: 'center', color: '#B24293', margin: '4rem 0', fontWeight: '500' }}>
                    Preparando tu experiencia de belleza...
                </p>
            ) : (
                <>
                    {/* PRODUCTOS DESTACADOS EN MAQUILLAJE */}
                    <section className={styles.section}>
                        <h1 className={styles.sectionTitle}>Nuestros productos destacados en Maquillaje</h1>
                        <div className={styles.productsCarouselWrapper}>
                            <Carousel slidesPerViewDesktop={4} slidesPerViewMobile={1} slidesPerViewTablet={2} autoPlayDelay={null} loop={true} slidesPerGroup={2}>
                                {makeupProducts.slice(0, 12).map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </Carousel>
                        </div>
                    </section>

                    {/* PRODUCTOS DESTACADOS EN UÑAS */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Nuestros productos destacados en Uñas</h2>
                        <div className={styles.productsCarouselWrapper}>
                            <Carousel slidesPerViewDesktop={4} slidesPerViewMobile={1} slidesPerViewTablet={2} autoPlayDelay={null} loop={true} slidesPerGroup={2}>
                                {nailProducts.slice(0, 12).map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </Carousel>
                        </div>
                    </section>

                    {/*  PERFUMERÍA EXCLUSIVA */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Perfumería Internacional Destacada</h2>
                        <div className={styles.productsCarouselWrapper}>
                            <Carousel slidesPerViewDesktop={4} slidesPerViewMobile={1} slidesPerViewTablet={2} autoPlayDelay={null} loop={true} slidesPerGroup={2}>
                                {perfumesMock.slice(0, 12).map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </Carousel>
                        </div>
                    </section>

                    {/*SELECCIÓN DE MARCAS*/}
                    <BrandSelector onSelectBrand={handleBrandSelect} />
                </>
            )}
        </div>
    );
};