import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const { loginWithRedirect, logout } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect({
      redirectUri: 'http://localhost:3000/callback',
      scope: 'openid profile email',
    });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Cerrar sesión</button>
      ) : (
        <button onClick={handleLogin}>Iniciar sesión</button>
      )}
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </div>
  );
};

export default Login;