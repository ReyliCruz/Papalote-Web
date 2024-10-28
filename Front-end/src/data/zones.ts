import pequenosImg from '../assets/images/pequeños.png';
import expresoImg from '../assets/images/expreso.png';
import soyImg from '../assets/images/soy.png';
import comunicoImg from '../assets/images/comunico.png';
import comprendoImg from '../assets/images/comprendo.png';
import pertenezcoImg from '../assets/images/pertenezco.png';

export interface Zone {
  id: number;
  text: string;
  color: string;
  image: string;
  subItems?: { name: string }[];
}

export const zones: Zone[] = [
  {
    id: 1,
    text: 'Pequeños',
    color: '#00B0D7',
    image: pequenosImg,
    subItems: [
      { name: 'Estratos' },
      { name: 'Exhibición 2' },
    ],
  },
  {
    id: 2,
    text: 'Expreso',
    color: '#F58220',
    image: expresoImg,
    subItems: [
      { name: 'SubOpción 1' },
      { name: 'SubOpción 2' },
    ],
  },
  {
    id: 3,
    text: 'Soy',
    color: '#E94D38',
    image: soyImg,
    subItems: [
      { name: 'Perfil' },
      { name: 'Actividad 1' },
    ],
  },
  {
    id: 4,
    text: 'Comunico',
    color: '#1D4E8F',
    image: comunicoImg,
    subItems: [
      { name: 'Lenguaje' },
      { name: 'Señas' },
    ],
  },
  {
    id: 5,
    text: 'Comprendo',
    color: '#302C71',
    image: comprendoImg,
    subItems: [
      { name: 'Conceptos Básicos' },
      { name: 'Ejercicio 1' },
    ],
  },
  {
    id: 6,
    text: 'Pertenezco',
    color: '#7BB343',
    image: pertenezcoImg,
    subItems: [
      { name: 'Exploración' },
      { name: 'Ejercicio 2' },
    ],
  },
];
