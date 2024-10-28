import contentIcon from '../assets/images/content-icon.png';
import statsIcon from '../assets/images/stats-icon.png';
import usersIcon from '../assets/images/users-icon.png';

export interface Section {
  id: number;
  text: string;
  primaryColor: string;
  secondaryColor: string;
  image: string;
  path: string;
}

export const sections: Section[] = [
  {
    id: 1,
    text: "Gestionar contenido",
    primaryColor: "#00AEEF",
    secondaryColor: "#008FC4",
    image: contentIcon,
    path: "/zonas",
  },
  {
    id: 2,
    text: "Estadísticas",
    primaryColor: "#F4A300",
    secondaryColor: "#C57E00",
    image: statsIcon,
    path: "/estadísticas",
  },
  {
    id: 3,
    text: "Gestionar usuarios",
    primaryColor: "#E74C3C",
    secondaryColor: "#C0392B",
    image: usersIcon,
    path: "/usuarios",
  },
];
