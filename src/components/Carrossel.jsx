import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import img1 from '../assets/carrossel/img1.jpg';

import S from './styles/Carrossel.module.css';

export const Carrossel = () => {
  return (
    <div className={S.carrossel}>
        <img src={img1} />
      <div className={S.overlay}></div>
    </div>
  );
};
