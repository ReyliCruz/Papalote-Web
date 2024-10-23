import React, { useState } from 'react';
import './Login.css'; // Importa los estilos

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para manejar el inicio de sesión
    console.log({ email, password });
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img src="/e51cee5ab825c4705758ba9e2056933c.png" alt="App Logo" className="logo" />
      </div>
      <form onSubmit={handleLogin}>
      <div className = "space"><h2 className = "colorwhite">Inicio de sesión</h2></div>
        <div className="input-container">
          <label htmlFor="email" className="colorwhite">Correo electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo electrónico"
          />
        </div>
        <div className="input-container">
          <label htmlFor="password" className="colorwhite">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
          />
        </div>
        <button type="submit">Acceder</button>
      </form>
    </div>
  );
};

export default Login;