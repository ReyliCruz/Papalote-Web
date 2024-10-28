// Archivo: src/data/opinions.ts

export interface Opinion {
    opinion: string;
    calificacion: number; // Calificación en una escala del 1 al 5
  }
  
  const opinions: Opinion[] = [
    {
      opinion: 'Me pareció una actividad muy interesante.',
      calificacion: 4,
    },
    {
      opinion: 'La mejor exhibición del museo.',
      calificacion: 5,
    },
    {
      opinion: 'Podría ser más interactivo.',
      calificacion: 3,
    },
    {
      opinion: 'Excelente para niños, aprendieron mucho.',
      calificacion: 5,
    },
    {
      opinion: 'Faltan más guías disponibles.',
      calificacion: 2,
    },
    {
      opinion: 'Muy educativo y entretenido.',
      calificacion: 5,
    },
    {
      opinion: 'Mejorar las explicaciones de algunas secciones.',
      calificacion: 3,
    }
  ];
  
  export default opinions;
  