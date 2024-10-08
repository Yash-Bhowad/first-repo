// script.js

$(document).ready(function() {
    // Sample product data
    const products = [
        { id: 1, brand: 'apple', name: 'iPhone 12', price: 799, image: 'https://example.com/iphone12.jpg' },
        { id: 2, brand: 'samsung', name: 'Galaxy S21', price: 799, image: 'https://example.com/galaxys21.jpg' },
        { id: 3, brand: 'google', name: 'Pixel 5', price: 699, image: 'https://example.com/pixel5.jpg' },
        { id: 4, brand: 'oneplus', name: 'OnePlus 9', price: 729, image: 'https://example.com/oneplus9.jpg' },
        // Add more products as needed
    ];

    // Function to render products
    function renderProducts(productsToRender, containerId) {
        const productList = $(containerId);
        productList.empty();

        productsToRender.forEach(product => {
            const productCard = `
                <div class="product-card" data-id="${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            `;
            productList.append(productCard);
        });
    }

    // Render products on the home page
    if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
        const featuredProducts = products.slice(0, 3); // Show first 3 products as featured
        renderProducts(featuredProducts, '#featured-product-list');
    }

    // Render products on the category page
    if (window.location.pathname === '/category.html') {
        renderProducts(products, '#product-list');

        // Brand filter functionality
        $('#brand-filter').on('change', function() {
            const selectedBrand = $(this).val();
            const filteredProducts = selectedBrand === 'all' 
                ? products 
                : products.filter(product => product.brand === selectedBrand);
            renderProducts(filteredProducts, '#product-list');
        });
    }

    // Cart functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        const cartItems = $('#cart-items');
        const cartCount = $('#cart-count');
        const totalAmount = $('#total-amount');

        cartItems.empty();
        let total = 0;

        cart.forEach(item => {
            cartItems.append(`<p>${item.name} - $${item.price}</p>`);
            total += item.price;
        });

        cartCount.text(cart.length);
        totalAmount.text(total.toFixed(2));

        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Update cart count on all pages
    updateCart();

    // Add to cart functionality
    $(document).on('click', '.add-to-cart', function() {
        const productId = $(this).closest('.product-card').data('id');
        const product = products.find(p => p.id === productId);
        cart.push(product);
        updateCart();
    });

    // Form submission (for demonstration purposes)
    $('#signin-form, #signup-form').on('submit', function(e) {
        e.preventDefault();
        alert('Form submitted successfully!');
    });

    // Checkout button
    $('#checkout-btn').on('click', function() {
        if (cart.length > 0) {
            alert('Thank you for your purchase!');
            cart = [];
            updateCart();
        } else {
            alert('Your cart is empty!');
        }
    });
});