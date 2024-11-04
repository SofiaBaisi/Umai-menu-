const cart = [];
const cartCount = document.querySelector('.content-shopping-cart.number');


function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = `(${totalItems})`;
}

function removeFromCart(productId) {
  const index = cart.findIndex(item => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    updateCartCount();
  }
}

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

document.addEventListener('DOMContentLoaded', function() {

  products.forEach(producto => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('card-product');  // Cambia esto si la clase es diferente

    const productName = document.createElement('h3');
    productName.textContent = producto.name;

    const productPrice = document.createElement('p');
    productPrice.classList.add('price');  // Añadir clase para el precio si es necesario
    productPrice.textContent = `Precio: $${producto.price}`;

    const productImage = document.createElement('img');
    productImage.src = producto.image;
    productImage.alt = producto.name;

    
    productDiv.appendChild(productName);
    productDiv.appendChild(productPrice);
    productDiv.appendChild(productImage);
  });
});



