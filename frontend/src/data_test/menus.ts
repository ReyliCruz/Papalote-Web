import { zones } from './zones';

export const basicMenu = [
  { name: 'Home', path: '/home' },
  { name: 'Contenido', path: '/contenido',     
    subItems: [
      { name: 'Zonas', path: '/contenido/zonas' },
      { name: 'Publicaciones', path: '/contenido/publicaciones' },
      { name: 'Logros', path: '/contenido/logros' },
      { name: 'Notificaciones', path: '/contenido/notificaciones' },
  ],
  },
  { name: 'Estadísticas', path: '/estadisticas' },
  { name: 'Usuarios', path: '/usuarios' },
  { name: 'Ajustes', path: '/ajustes' },
];

export const advancedMenu = [
  {
    name: '⬅️ Regresar ',
    path: '/contenido',
  },
  {
    name: 'Zonas',
    path: '/zonas',
  },
  ...zones.map((zone) => ({
    name: zone.text,
    path: `/${zone.text.toLowerCase()}`,
    subItems: zone.subItems?.map((subItem) => ({
      name: subItem.name,
      path: `/${zone.text.toLowerCase()}/${subItem.name.toLowerCase()}`,
    })),
  })),
];