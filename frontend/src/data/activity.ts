import soyImg from '../assets/images/soy.png';

export interface Activity {
    title: string;
    text: string;
    img: string;
  }
  
  export const activity: Activity = {
    title: "Exploración de Suelo",
    text: "En esta actividad, los participantes aprenderán sobre las capas del suelo, su importancia y cómo interactúan en el ecosistema.",
    img: soyImg,
  };
  