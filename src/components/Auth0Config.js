import { Auth0Client } from '@auth0/auth0-js';

const auth0 = new Auth0Client({
  domain: 'tu-dominio.auth0.com',
  clientId: 'tu-client-id',
  redirectUri: 'http://localhost:3000/callback',
  scope: 'openid profile email',
});

export default auth0;