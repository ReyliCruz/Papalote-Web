import { zones } from './zones';

export const basicMenu = [
  { name: 'Home', path: '/home' },
  { name: 'Ajustes', path: '/ajustes' },
];

export const advancedMenu = [
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