export interface MultimediaItem {
    type: 'image' | 'video';
    src: string;
  }
  
  export const multimedia: MultimediaItem[] = [
    {
      type: 'image',
      src: 'https://via.placeholder.com/600x400',
    },
    {
      type: 'video',
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      type: 'image',
      src: 'https://via.placeholder.com/800x600',
    },
  ];
  