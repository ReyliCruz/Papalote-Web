import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GreenButton from '../components/GreenButton';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });

    // Lógica para autenticación

    navigate('/home');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div
        className="
          bg-lightBlue
          w-[90%]
          md:w-[65%]
          p-10 
          rounded-2xl 
          shadow-lg 
          grid 
          gap-8
          grid-cols-1 
          md:grid-cols-2 
          items-center 
        "
      >
        <div className="flex justify-center">
          <img
            src="/images/Logo Papalote Monterrey.png"
            alt="Logo Papalote Monterrey"
            className="aspect-auto max-h-[250px] md:max-h-[300px]"
          />
        </div>

        <form className="flex flex-col items-center space-y-4 py-24" onSubmit={handleLogin}>
          <h2 className="text-white text-2xl font-bold">Inicio de sesión</h2>

          <div className="w-full">
            <label htmlFor="email" className="block text-white mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo electrónico"
              className="
                w-full 
                px-3 
                py-2 
                rounded-md 
                border 
                border-gray-300 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-300 
                focus:border-transparent
              "
            />
          </div>

          <div className="w-full">
            <label htmlFor="password" className="block text-white mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              className="
                w-full 
                px-3 
                py-2 
                mb-8
                rounded-md 
                border 
                border-gray-300 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-300 
                focus:border-transparent
              "
            />
          </div>

          <GreenButton text="Acceder" />
        </form>
      </div>
    </div>
  );
};

export default Login;
