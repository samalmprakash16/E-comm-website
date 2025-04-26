const products = [
     { id: 1, name: "Men's T-shirt", price: 19.99 },
     { id: 2, name: "Men's Jeans", price: 39.99 },
     { id: 3, name: "Men's Jacket", price: 59.99 },
     { id: 4, name: "Men's Sneakers", price: 49.99 }
 ];
 
 let cart = [];
 let userLoggedIn = false;
 
 function loadProducts() {
     const productList = document.getElementById('product-list');
     products.forEach(product => {
         const productDiv = document.createElement('div');
         productDiv.className = 'product';
         productDiv.innerHTML = `
             <h3>${product.name}</h3>
             <p>Price: $${product.price.toFixed(2)}</p>
             <button onclick="addToCart(${product.id})">Add to Cart</button>
         `;
         productList.appendChild(productDiv);
     });
 }
 
 function addToCart(productId) {
     if (!userLoggedIn) {
         alert('Please log in to add items to the cart.');
         return;
     }
     const product = products.find(p => p.id === productId);
     cart.push(product);
     document.getElementById('cart-count').innerText = cart.length;
     alert(`${product.name} added to cart!`);
 }
 
 function toggleCart() {
     const cartModal = document.getElementById('cart-modal');
     cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
     displayCartItems();
 }
 
 function displayCartItems() {
     const cartItems = document.getElementById('cart-items');
     cartItems.innerHTML = '';
     cart.forEach((item, index) => {
         const li = document.createElement('li');
         li.innerText = `${item.name} - $${item.price.toFixed(2)} (Remove)`;
         li.onclick = () => removeFromCart(index);
         cartItems.appendChild(li);
     });
 }
 
 function removeFromCart(index) {
     cart.splice(index, 1);
     document.getElementById('cart-count').innerText = cart.length;
     displayCartItems();
 }
 
 function checkout() {
     alert('Proceeding to checkout with ' + cart.length + ' items.');
     cart = [];
     document.getElementById('cart-count').innerText = 0;
     toggleCart();
 }
 
 function toggleLogin() {
     const loginModal = document.getElementById('login-modal');
     loginModal.style.display = loginModal.style.display === 'block' ? 'none' : 'block';
 }
 
 function submitLogin() {
     const name = document.getElementById('name').value;
     const email = document.getElementById('email').value;
     
     if (name && email) {
         userLoggedIn = true;
         alert('Welcome, ' + name + '!');
         toggleLogin();
     } else {
         alert('Please fill in all fields.');
     }
 }
 
 window.onload = loadProducts;