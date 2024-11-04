import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import auth0 from './Auth0Config';
import './index.css';

const Callback = () => {
  const { handleRedirectCallback } = useAuth0();

  handleRedirectCallback();

  return <div>Redireccionando...</div>;
};

ReactDOM.render(
  <Auth0Provider
    domain={auth0.domain}
    clientId={auth0.clientId}
    redirectUri={auth0.redirectUri}
    scope={auth0.scope}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

var lista = document.querySelectorAll('.nav li');
function activarlink() {
  lista.forEach((item) => item.classList.remove('active'));
  this.classList.add('active');
}

lista.forEach((item) => item.addEventListener('mouseover', activarlink));

/*funcion del nav*/

var toggle = document.querySelector('.toggle');
var nav = document.querySelector('.nav');
var container = document.querySelector('.container');

toggle.onclick = function() {
  nav.classList.toggle('active');
  container.classList.toggle('active');
};