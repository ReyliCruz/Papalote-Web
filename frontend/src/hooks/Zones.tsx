import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export interface SubItem {
  id: number;
  name: string;
}

export interface ImageItem {
  id: number;
  img: string;
}

export interface Zone {
  id: number;
  text: string;
  color: string;
  image: string;
  mensaje: string;
  descripcion: string;
  subItems?: SubItem[];
  images?: ImageItem[];
}

interface ZonesContextValue {
  zones: Zone[];
  loading: boolean;
  error: string | null;
}

const ZonesContext = createContext<ZonesContextValue>({
  zones: [],
  loading: true,
  error: null,
});

export const ZonesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchZones = async () => {
      const endpoint = 'https://papalote-backend.onrender.com/api/exhibitions-by-zone/';
      try {
        const response = await axios.get(endpoint);

        const transformedZones: Zone[] = response.data.map((zone: any) => ({
          id: zone.id,
          text: zone.text.charAt(0).toUpperCase() + zone.text.slice(1).toLowerCase(),
          color: zone.color || '#CDE5C3',
          image: zone.image || '',
          mensaje: zone.mensaje || '',
          descripcion: zone.descripcion || '',
          subItems: zone.subItems?.map((subItem: any) => ({
            id: subItem.id,
            name: subItem.name.charAt(0).toUpperCase() + subItem.name.slice(1).toLowerCase(),
          })) || [],
          images: zone.images?.map((image: any) => ({
            id: image.id,
            img: image.img,
          })) || [],
        }));

        setZones(transformedZones);
      } catch (err) {
        setError('Error fetching zones');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchZones();
  }, []);

  return (
    <ZonesContext.Provider value={{ zones, loading, error }}>
      {children}
    </ZonesContext.Provider>
  );
};


export const useZones = () => useContext(ZonesContext);
