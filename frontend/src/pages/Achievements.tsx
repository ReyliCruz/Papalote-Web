import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GreenButton from '../components/GreenButton';

const Achievements: React.FC = () => {
  const [rewardType, setRewardType] = useState<string>('');
  const [challengeType, setChallengeType] = useState<string>('');
  const [zoneId, setZoneId] = useState<number | null>(null);
  const [exhibitionId, setExhibitionId] = useState<number | null>(null);
  const [rewardName, setRewardName] = useState<string>('');
  const [goal, setGoal] = useState<number | ''>('');
  const [description, setDescription] = useState<string>('');
  const [challengeIcon, setChallengeIcon] = useState<File | null>(null);
  const [rewardImage, setRewardImage] = useState<File | null>(null);

  const [zones, setZones] = useState<any[]>([]);
  const [exhibitions, setExhibitions] = useState<any[]>([]);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const zonesResponse = await axios.get('https://papalote-backend.onrender.com/api/zonas/');
        const exhibitionsResponse = await axios.get(
          'https://papalote-backend.onrender.com/api/exhibiciones/'
        );
        setZones(zonesResponse.data);
        setExhibitions(exhibitionsResponse.data);
      } catch (error) {
        console.error('Error fetching catalogs:', error);
      }
    };

    fetchCatalogs();
  }, []);

  const handleSubmit = async () => {
    if (!challengeIcon || !rewardImage || !rewardName || !goal || !description || !rewardName || !rewardType || !challengeType) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    const formData = new FormData();
    formData.append('img_desafio', challengeIcon || '');
    formData.append('img_recompensa', rewardImage || '');
    formData.append('nombre_desafio', rewardName);
    formData.append('valor_meta', String(goal));
    formData.append('descripcion_es', description);
    formData.append('nombre_recompensa', rewardName);
    formData.append('tipo_recompensa', rewardType);
    formData.append('tipo_desafio', challengeType);
    if (zoneId) formData.append('zona', String(zoneId));
    if (exhibitionId) formData.append('exhibicion', String(exhibitionId));

    try {
      const response = await axios.post(
        'https://papalote-backend.onrender.com/api/desafios/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Desafío creado:', response.data);
      alert('¡Desafío registrado con éxito!');
    } catch (error) {
      console.error('Error creating challenge:', error);
      alert('Error al registrar el desafío.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center mb-8">Registrar Desafíos y Recompensas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="block">
            Nombre del desafío
            <input
              type="text"
              value={rewardName}
              onChange={(e) => setRewardName(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </label>

          <label className="block">
            Descripción
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </label>

          <label className="block">
            Meta a alcanzar
            <input
              type="number"
              value={goal}
              onChange={(e) => setGoal(Number(e.target.value))}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </label>

          <label className="block">
            Icono del desafío
            <div className="flex items-center space-x-4">
              {challengeIcon && (
                <img
                  src={URL.createObjectURL(challengeIcon)}
                  alt="Icono del desafío"
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, setChallengeIcon)}
                className="block"
              />
            </div>
          </label>
        </div>

        <div className="space-y-4">
          <label className="block">
            Tipo de desafío
            <select
              value={challengeType}
              onChange={(e) => setChallengeType(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
            >
              <option value="">Selecciona un tipo</option>
              <option value="Escanear">Escanear</option>
              <option value="Publicacion">Publicación</option>
              <option value="Opinion">Opinión</option>
            </select>
          </label>

          <label className="block">
            Tipo de recompensa
            <select
              value={rewardType}
              onChange={(e) => setRewardType(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
            >
              <option value="">Selecciona un tipo</option>
              <option value="Tarjeta">Tarjeta de usuario</option>
              <option value="Insignia">Insignia</option>
            </select>
          </label>

          <label className="block">
            Zona
            <select
              value={zoneId || ''}
              onChange={(e) => setZoneId(Number(e.target.value))}
              className="border border-gray-300 rounded-lg p-2 w-full"
            >
              <option value="">Selecciona una zona</option>
              {zones.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.nombre}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            Exhibición (Opcional)
            <select
              value={exhibitionId || ''}
              onChange={(e) => setExhibitionId(Number(e.target.value))}
              className="border border-gray-300 rounded-lg p-2 w-full"
            >
              <option value="">Selecciona una exhibición</option>
              {exhibitions.map((exhibition) => (
                <option key={exhibition.id} value={exhibition.id}>
                  {exhibition.nombre}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            Imagen recompensa
            <div className="flex items-center space-x-4">
              {rewardImage && (
                <img
                  src={URL.createObjectURL(rewardImage)}
                  alt="Imagen recompensa"
                  className={`${
                    rewardType === 'insignia' ? 'rounded-full' : 'rounded-md'
                  } w-32 h-32 object-cover`}
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, setRewardImage)}
                className="block"
              />
            </div>
          </label>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <GreenButton text="Registrar Desafío" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Achievements;
