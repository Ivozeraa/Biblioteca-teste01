import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import img1 from '../assets/img1.jpg';

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
    autoplaySpeed: 3000
  };

  return (
    <div className={S.carrossel}>
      <div className={S.overlay}></div>
      <Slider {...settings} className={S.slider}>
        <img src={img1} />
        <img src={img1} />
        <img src={img1} />
      </Slider>
    </div>
  );
};
