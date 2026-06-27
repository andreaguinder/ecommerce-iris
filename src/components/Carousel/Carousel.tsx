import { type FC, type ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './Carousel.module.css';

interface CarouselProps {
  children: ReactNode[];
  slidesPerViewMobile?: number;
  slidesPerViewTablet?: number;
  slidesPerViewDesktop?: number;
  slidesPerGroup?: number;
  showNavigation?: boolean;
  showPagination?: boolean;
  autoPlayDelay?: number | null;
  loop?: boolean;
  centeredSlides?: boolean;
}

export const Carousel: FC<CarouselProps> = ({
  children,
  slidesPerViewMobile = 1,
  slidesPerViewDesktop = 4,
  slidesPerViewTablet = 2,
  slidesPerGroup = 1,
  showNavigation = true,
  showPagination = true,
  autoPlayDelay = 3000,
    loop = true,
    centeredSlides = true,
}) => {
  

  const modules = [];
  if (showNavigation) modules.push(Navigation);
  if (showPagination) modules.push(Pagination);
  if (autoPlayDelay) modules.push(Autoplay);

  return (
    <div className={styles.carouselContainer}>
      <Swiper
        modules={modules}
        spaceBetween={20}
        slidesPerView={slidesPerViewMobile}
        slidesPerGroup={slidesPerGroup}
        navigation={showNavigation}
        pagination={showPagination ? { clickable: true } : false}
        autoplay={autoPlayDelay ? { delay: autoPlayDelay, disableOnInteraction: false } : false}
        loop={loop}
        centeredSlides={centeredSlides}

        breakpoints={{
          768: {
            slidesPerView: slidesPerViewTablet,
            centeredSlides: false,
          },
          1024: {
            slidesPerView: slidesPerViewDesktop,
            centeredSlides: false, 
          }
        }}
      >
        {children.map((item, index) => (
          <SwiperSlide key={index}>
            {item}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};