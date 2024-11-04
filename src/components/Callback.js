import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Callback = () => {
  const { handleRedirectCallback } = useAuth0();

  handleRedirectCallback();

  return <div>Redireccionando...</div>;
};

export default Callback;