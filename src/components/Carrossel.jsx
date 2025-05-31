import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import img1 from '../assets/carrossel/img1.jfif';

import S from './styles/Carrossel.module.css';

export const Carrossel = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className={S.carrossel}>
      <Slider {...settings} className={S.slider}>
        <img src={img1} />
        <img src={img1} />
        <img src={img1} />
      </Slider>
      <div className={S.overlay}></div>
    </div>
  );
};
