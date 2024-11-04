import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cart }) => {
  return (
    <header>
      <nav>
        <ul>
          <li><a href="/login">Iniciar sesión</a></li>
          <li><a href="/">Inicio</a></li>
        </ul>
      </nav>
      <div className="container-hero">
        <div className="container hero">
          <div className="customer-support">
            <i className="fa-solid fa-headset"></i>
            <div className="content-customer-support">
              <span className="text">Customer Support</span>
              <span className="number">123-456-7890</span>
            </div>
          </div>
          <div className="container-logo">
            <i className="fa-solid fa-mug-hot"></i>
            <h1 className="logo"><Link to="/">Welcome</Link></h1>
          </div>
          <div className="container-user">
            <i className="fa-solid fa-user"></i>
            <i className="fa-solid fa-basket-shopping"></i>
            <div className="content-shopping-cart">
              <span className="text">Trolley</span>
              <span className="number">({cart.length})</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};



export default Header;
