import React, { useState } from 'react';

interface MultimediaItem {
  type: 'image' | 'video';
  src: string;
}

interface MultimediaTemplateProps {
  initialMultimedia: MultimediaItem[];
}

const MultimediaTemplate: React.FC<MultimediaTemplateProps> = ({
  initialMultimedia,
}) => {
  const [multimedia, setMultimedia] = useState<MultimediaItem[]>(initialMultimedia);
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
    <div className="grid grid-cols-2 gap-8">
      {/* Sección de Imágenes */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Agregar imagen</h2>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            placeholder="URL de la imagen"
            className="border rounded p-2 flex-grow"
          />
          <button
            onClick={() => {
              handleAddMultimedia('image', newImage);
              setNewImage('');
            }}
            className="bg-gray-800 text-white px-4 rounded"
          >
            Agregar
          </button>
        </div>
        <div className="space-y-4">
          {multimedia
            .filter((item) => item.type === 'image')
            .map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <img
                  src={item.src}
                  alt={`Imagen ${index + 1}`}
                  className="w-32 h-20 object-cover rounded shadow"
                />
                <button
                  onClick={() => handleRemoveMultimedia(index)}
                  className="bg-red-500 text-white px-4 rounded"
                >
                  Eliminar
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Sección de Videos */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Agregar video</h2>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={newVideo}
            onChange={(e) => setNewVideo(e.target.value)}
            placeholder="URL del video"
            className="border rounded p-2 flex-grow"
          />
          <button
            onClick={() => {
              handleAddMultimedia('video', newVideo);
              setNewVideo('');
            }}
            className="bg-gray-800 text-white px-4 rounded"
          >
            Agregar
          </button>
        </div>
        <div className="space-y-4">
          {multimedia
            .filter((item) => item.type === 'video')
            .map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <video
                  src={item.src}
                  controls
                  className="w-32 h-20 object-cover rounded shadow"
                />
                <button
                  onClick={() => handleRemoveMultimedia(index)}
                  className="bg-red-500 text-white px-4 rounded"
                >
                  Eliminar
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MultimediaTemplate;
