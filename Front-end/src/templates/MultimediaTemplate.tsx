import React, { useState } from 'react';
import { multimedia as initialMultimedia } from '../data/multimedia';

const MultimediaTemplate: React.FC = () => {
  const [multimedia, setMultimedia] = useState(initialMultimedia);
  const [newImage, setNewImage] = useState<string>('');
  const [newVideo, setNewVideo] = useState<string>('');

  const handleAddMultimedia = (type: 'image' | 'video', src: string) => {
    if (src) {
      setMultimedia([...multimedia, { type, src }]);
    }
  };

  const handleRemoveMultimedia = (index: number) => {
    setMultimedia(multimedia.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-center lg:text-left">Agregar Imagen</h2>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            placeholder="URL de la imagen"
            className="border border-gray-300 rounded-lg p-2 flex-grow"
          />
          <button
            onClick={() => {
              handleAddMultimedia('image', newImage);
              setNewImage('');
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Agregar
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {multimedia
            .filter((item) => item.type === 'image')
            .map((item, index) => (
              <div key={index} className="relative">
                <img
                  src={item.src}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg shadow-lg"
                />
                <button
                  onClick={() => handleRemoveMultimedia(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full shadow-md hover:bg-red-600 transition"
                >
                  ✕
                </button>
              </div>
            ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-center lg:text-left">Agregar Video</h2>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={newVideo}
            onChange={(e) => setNewVideo(e.target.value)}
            placeholder="URL del video"
            className="border border-gray-300 rounded-lg p-2 flex-grow"
          />
          <button
            onClick={() => {
              handleAddMultimedia('video', newVideo);
              setNewVideo('');
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Agregar
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {multimedia
            .filter((item) => item.type === 'video')
            .map((item, index) => (
              <div key={index} className="relative">
                <video
                  src={item.src}
                  controls
                  className="w-full h-32 object-cover rounded-lg shadow-lg"
                />
                <button
                  onClick={() => handleRemoveMultimedia(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full shadow-md hover:bg-red-600 transition"
                >
                  ✕
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MultimediaTemplate;
