import contentIcon from '../assets/images/content-icon.png';
//import statsIcon from '../assets/images/stats-icon.png';
//import usersIcon from '../assets/images/users-icon.png';
import achievementIcon from '../assets/images/achievement-icon.png'
import exhibitionIcon from '../assets/images/exhibition-icon.png'
import notificationIcon from '../assets/images/notification-icon.png'
import publicationIcon from '../assets/images/publication-icon.png'

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
    text: "Zonas y exhibiciones",
    primaryColor: "#00AEEF",
    secondaryColor: "#008FC4",
    image: exhibitionIcon,
    path: "/contenido/zonas",
  },
  {
    id: 2,
    text: "Publicaciones",
    primaryColor: "#F4A300",
    secondaryColor: "#C57E00",
    image: publicationIcon,
    path: "/contenido/publicaciones",
  },
  {
    id: 3,
    text: "Logros y recompensas",
    primaryColor: "#E74C3C",
    secondaryColor: "#C0392B",
    image: achievementIcon,
    path: "/contenido/logros",
  },
  {
    id: 4,
    text: "Notificaciones",
    primaryColor: "#00A65A",
    secondaryColor: "#009552",
    image: notificationIcon,
    path: "/contenido/notificaciones",
  },
  {
    id: 5,
    text: "Otros",
    primaryColor: "#0073B6",
    secondaryColor: "#0068A5",
    image: contentIcon,
    path: "/contenido/notificaciones",
  },
];
