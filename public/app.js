import React, { useState, useCallback } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import AuthMiddleware from './components/AuthMiddleware';
import { useAuth0 } from '@auth0/auth0-react';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const { isAuthenticated, user } = useAuth0();

  const products = [
    { id: 1, name: 'Fried chicken', price: 4.60, originalPrice: 5.30, image: 'img/FRITA.jpg', discount: 13, rating: 4 },
    { id: 2, name: 'Squid', price: 5.70, originalPrice: 7.30, image: 'img/pulpo.jpg', discount: 22, rating: 3 },
    { id: 3, name: 'Udon', price: 3.20, image: 'img/udon.jpg', rating: 5 },
    { id: 4, name: 'Ramen', price: 5.60, image: 'img/ramen-category.jpg', rating: 4 },
    { id: 5, name: 'Flan', price: 4.60, originalPrice: 5.30, image: 'img/flan.jpg', discount: 13, rating: 4 },
    { id: 6, name: 'Cream bread', price: 5.70, originalPrice: 7.30, image: 'img/pandecrema.jpg', discount: 22, rating: 3 },
    { id: 7, name: 'Mochi', price: 3.85, originalPrice: 5.50, image: 'img/mochi.jpg', discount: 30, rating: 5 },
    { id: 8, name: 'Cake', price: 5.60, image: 'img/pastel.jpg', rating: 4 },
  ];

  const addToCart = useCallback((product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }, [cartItems]);

  const removeFromCart = useCallback((productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  }, [cartItems]);

  const updateQuantity = useCallback((productId, quantity) => {
    const item = cartItems.find((item) => item.id === productId);
    if (item) {
      item.quantity = quantity;
      setCartItems([...cartItems]);
    }
  }, [cartItems]);

  const pagarClicked = useCallback(() => {
    alert("Gracias por la compra");
    setCartItems([]);
    setCartVisible(false);
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          {isAuthenticated && (
            <AuthMiddleware>
              <Route path="/" component={Home} />
              <Route path="/products" component={Products} />
            </AuthMiddleware>
          )}
        </Switch>
      </BrowserRouter>
      {isAuthenticated && (
        <div>
          <h2>Bienvenido, {user.name}!</h2>
          <p>Correo electrónico: {user.email}</p>
        </div>
      )}
      <Header cartItems={cartItems} />
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
          <ProductList products={products} onAddToCart={addToCart} />
        </Route>
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/cart">
          <Cart
            cartItems={cartItems}
            onRemoveFromCart={removeFromCart}
            onUpdateQuantity={updateQuantity}
          />
        </Route>
      </Switch>
      {cartVisible && (
        <div className="cart">
          <h2>Carrito de compras</h2>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} x {item.quantity}
                <button className="btn-eliminar" onClick={() => removeFromCart(item.id)}>Eliminar</button>
                <div>
                  <button className="sumar-cantidad" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  <span>{item.quantity}</span>
                  <button className="restar-cantidad" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                </div>
              </li>
            ))}
          </ul>
          <button className="btn-pagar" onClick={pagarClicked}>Pagar</button>
        </div>
      )}
    </div>
  );
};

export default App;


var cartVisible = false;


if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){

    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCart);
    }


    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    var botonesAgregarAlCart = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlCart.length; i++){
        var button = botonesAgregarAlCart[i];
        button.addEventListener('click', agregarAlCartClicked);
    }


    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);
}


function pagarClicked(){
    alert("Gracias por la compra");

    var cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild);
    }
    actualizarTotalCart();
    ocultarCart();
}


function agregarAlCartClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCart(titulo, precio, imagenSrc);

    hacerVisibleCart();
}
function hacerVisibleCart(){
    cartVisible = true;
    var cart = document.getElementsByClassName('cart')[0];
    cart.style.marginRight = '0';
    cart.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

function agregarItemAlCart(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add('item');
    var itemsCart = document.getElementsByClassName('cart-items')[0];

  
    var nombresItemsCart = itemsCart.getElementsByClassName('cart-item-titulo');
    for(var i=0; i < nombresItemsCart.length; i++){
        if(nombresItemsCart[i].innerText == titulo){
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    var itemCartContenido = `
        <div class="cart-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="cart-item-detalles">
                <span class="cart-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="cart-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="cart-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;
    item.innerHTML = itemCartContenido;
    itemsCart.append(item);


    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCart);

  
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click', restarCantidad);

    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad);

    actualizarTotalCart();
}


function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('cart-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('cart-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('cart-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCart();
}


function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('cart-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('cart-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual >= 1){
        selector.getElementsByClassName('cart-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCart();
    }
}


function eliminarItemCart(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();

    actualizarTotalCart();

    ocultarCart();
}


function ocultarCart(){
    var cartItems = document.getElementsByClassName('cart-items')[0];
    if(cartItems.childElementCount == 0){
        var cart = document.getElementsByClassName('cart')[0];
        cart.style.marginRight = '-100%';
        cart.style.opacity = '0';
        cartVisible = false;

        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}


function actualizarTotalCart(){
   
    var cartContenedor = document.getElementsByClassName('cart')[0];
    var cartItems = cartContenedor.getElementsByClassName('cart-item');
    var total = 0;
    
    for(var i=0; i< cartItems.length; i++){
        var item = cartItems[i];
        var precioElemento = item.getElementsByClassName('cart-item-precio')[0];
        
        var precio = parseFloat(precioElemento.innerText.replace('$', '').replace('.', ''));
        var cantidadItem = item.getElementsByClassName('cart-item-cantidad')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('cart-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ",00";
}
