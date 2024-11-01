import { products } from './products.js';

// Selecciona el contenedor de productos usando el id "containerItems"
const containerItems = document.getElementById('containerItems');

function renderProducts() {
    containerItems.innerHTML = '';

    products.forEach(product => {
        // Crear un div contenedor para cada producto
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');

        // Crear el contenido HTML de cada producto con clases en inglés
        productDiv.innerHTML = `
            <span class="title-product">${product.name}</span>
            <img src="${product.src}" alt="${product.name}" class="img-product">
            <span class="price-product">$${product.price.toLocaleString()}</span>
            <p class="description-product">${product.description}</p>
            <span class="quantity-product">Quantity: ${product.quantity}</span>
            <button class="button-product">Add to Cart</button>
        `;

        // Añadir el div del producto al contenedor principal
        containerItems.appendChild(productDiv);
    });
}

// Llamar a la función para mostrar los productos en pantalla
renderProducts();
