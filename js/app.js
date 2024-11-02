import { products } from './products.js';

let cart = [];
const cartContainer = document.getElementById('cartContainer');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cart-count');
const emptyCartMessage = document.getElementById('emptyCartMessage');
const containerItems = document.getElementById('containerItems');

function renderProducts() {
    containerItems.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');

        productDiv.innerHTML = `
            <span class="title-product">${product.name}</span>
            <img src="${product.src}" alt="${product.name}" class="img-product">
            <span class="price-product">$${product.price.toLocaleString()}</span>
            <p class="description-product">${product.description}</p>
            <span class="quantity-product">Cantidad disponible: <span id="quantity-${product.id}">${product.quantity}</span></span>
            <button class="button-product" data-id="${product.id}" ${product.quantity === 0 ? 'disabled' : ''}>agregar al carrito</button>
            <span class="out-of-stock ${product.quantity > 0 ? 'd-none' : ''} text-danger">Agotado</span>
        `;

        const addButton = productDiv.querySelector('.button-product');
        addButton.addEventListener('click', () => {
            addToCart(product);
        });

        containerItems.appendChild(productDiv);
    });
}

document.getElementById('empty-cart').addEventListener('click', () => {
    cartItems = [];
    updateCartDisplay();
});

function toggleCart() {
    cartContainer.style.display = (cartContainer.style.display === "none" || cartContainer.style.display === "") ? "block" : "none";
    updateCartDisplay();
}

function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        if (product.quantity > 0) {
            existingProduct.quantity++;
            product.quantity--;
        } else {
            alert(`El producto ${product.name} está agotado.`);
        }
    } else if (product.quantity > 0) {
        cart.push({ ...product, quantity: 1 });
        product.quantity--; 
    } else {
        alert(`No hay suficiente stock de ${product.name}.`);
    }

    // Actualizar visualización del carrito y volver a renderizar productos
    updateCartDisplay();
    renderProducts(); // Actualizar la lista de productos
}


function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartCount.textContent = '0';  
    } else {
        emptyCartMessage.style.display = 'none';
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);  
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'my-2');
            itemElement.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})" >Eliminar</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

document.getElementById('purchaseButton').addEventListener('click', () => {
    
    const purchaseModal = new bootstrap.Modal(document.getElementById('purchaseModal'));
    purchaseModal.show();

    
    cart = [];
    updateCartDisplay(); 
    renderProducts(); 
});


document.getElementById('cartDropdown').addEventListener('click', toggleCart);
renderProducts();
