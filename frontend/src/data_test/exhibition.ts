import soyImg from '../assets/images/soy.png';

export interface Exhibition {
  img: string;
  message: string;
}

export const exhibition: Exhibition = {
  img: soyImg,
  message: 'Explora las capas de la tierra y descubre sus secretos.',
};
