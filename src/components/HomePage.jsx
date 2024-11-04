import React, { useState } from 'react';

const products = [
    { id: 1, name: 'Fried chicken', price: 4.60, originalPrice: 5.30, image: 'img/FRITA.jpg', discount: 13, rating: 4 },
    { id: 2, name: 'Squid', price: 5.70, originalPrice: 7.30, image: 'img/pulpo.jpg', discount: 22, rating: 3 },
    { id: 3, name: 'Udon', price: 3.20,  image: 'img/udon.jpg',  rating: 5 },
    { id: 4, name: 'Ramen', price: 5.60,  image: 'img/ramen-category.jpg', rating: 4 },
    { id: 5, name: 'Flan', price: 4.60, originalPrice: 5.30, image: 'img/flan.jpg', discount: 13, rating: 4 },
    { id: 6, name: 'Cream bread', price: 5.70, originalPrice: 7.30, image: 'img/pandecrema.jpg', discount: 22, rating: 3 },
    { id: 7, name: 'Mochi', price: 3.85, originalPrice: 5.50, image: 'img/mochi.jpg', discount: 30, rating: 5 },
    { id: 8, name: 'Cake', price: 5.60,  image: 'img/pastel.jpg', rating: 4 },
];

function HomePage() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    // Verificar si el producto ya está en el carrito
    const itemExists = cartItems.find(item => item.id === product.id);

    if (itemExists) {
      // Si el producto ya está en el carrito, incrementar su cantidad
      const updatedCartItems = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      // Si el producto no está en el carrito, agregarlo con una cantidad inicial de 1
      const newItem = { ...product, quantity: 1 };
      setCartItems([...cartItems, newItem]);
    }

    // Lógica adicional para actualizar el carrito
  };

  return (
    <div>
      <h2>Menús disponibles</h2>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
