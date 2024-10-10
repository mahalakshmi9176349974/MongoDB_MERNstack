// Sample products to be displayed (extend as needed)
const products = {
    household: [
        { name: 'Broom', price: 100, img: 'download.jpeg' },
        { name: 'Detergent', price: 150, img: 'download (1).jpeg' },
        { name: 'Mop', price: 200, img: 'download (2).jpeg' },
        { name: 'Toilet Cleaner', price: 120, img: 'download (3).jpeg' },
        { name: 'Dish Soap', price: 80, img: 'images.jpeg' },
        { name: 'Laundry Basket', price: 250, img: 'download (4).jpeg' },
        { name: 'Tissues', price: 40, img: 'download (5).jpeg' },
        { name: 'Garbage Bags', price: 50, img: 'download (6).jpeg' },
        { name: 'Sponges', price: 30, img: 'images (1).jpeg' },
        { name: 'Gloves', price: 60, img: 'download (7).jpeg' }
    ],
    pantry: [
        { name: 'Rice', price: 60, img: 'download (8).jpeg' },
        { name: 'Wheat Flour', price: 50, img: 'download (9).jpeg' },
        { name: 'Sugar', price: 40, img: 'images (2).jpeg'},
        { name: 'Salt', price: 20, img: 'images (3).jpeg' },
        { name: 'Spices', price: 100, img: 'download (10).jpeg' },
        { name: 'Oil', price: 130, img: 'download (11).jpeg' },
        { name: 'Lentils', price: 80, img: 'download (12).jpeg' },
        { name: 'Tea', price: 120, img: 'images (4).jpeg' },
        { name: 'Coffee', price: 150, img: 'download (14).jpeg' },
        { name: 'Pulses', price: 90, img: 'download (13).jpeg' }
    ],
    freshproduce: [
        { name: 'Apples', price: 120, img: 'download (15).jpeg' },
        { name: 'Bananas', price: 60, img: 'download (16).jpeg' },
        { name: 'Carrots', price: 80, img: 'download (17).jpeg' },
        { name: 'Tomatoes', price: 90, img: 'download (18).jpeg' },
        { name: 'Potatoes', price: 50, img: 'download (19).jpeg' },
        { name: 'Onions', price: 40, img: 'download (20).jpeg' },
        { name: 'Spinach', price: 30, img: 'download (21).jpeg' },
        { name: 'Garlic', price: 20, img: 'download (22).jpeg' },
        { name: 'Ginger', price: 25, img: 'download (24).jpeg' },
        { name: 'Cucumbers', price: 35, img: 'download (23).jpeg' }
    ],
    snacks: [
        { name: 'Chips', price: 50, img: 'download (25).jpeg' },
        { name: 'Cookies', price: 70, img: 'download (26).jpeg' },
        { name: 'Nuts', price: 150, img: 'download (27).jpeg' },
        { name: 'Popcorn', price: 40, img: 'download (28).jpeg' },
        { name: 'Soda', price: 60, img: 'images (5).jpeg' },
        { name: 'Juice', price: 80, img: 'download (29).jpeg' },
        { name: 'Energy Drinks', price: 100, img: 'download (30).jpeg' },
        { name: 'Biscuits', price: 55, img: 'download (31).jpeg' },
        { name: 'Chocolate', price: 90, img: 'images (6).jpeg' },
        { name: 'Gummies', price: 65, img: 'download (32).jpeg' }
    ],
    bakery: [
        { name: 'Bread', price: 40, img: 'download (33).jpeg' },
        { name: 'Butter', price: 70, img: 'download (34).jpeg' },
        { name: 'Cheese', price: 120, img: 'download (35).jpeg'},
        { name: 'Milk', price: 50, img: 'download (36).jpeg' },
        { name: 'Yogurt', price: 60, img: 'download (37).jpeg' },
        { name: 'Croissants', price: 90, img: 'download (38).jpeg' },
        { name: 'Donuts', price: 80, img: 'download (39).jpeg' },
        { name: 'Bagels', price: 70, img: 'download (40).jpeg' },
        { name: 'Pastries', price: 100, img: 'download (41).jpeg' },
        { name: 'Cupcakes', price: 110, img: 'download (42).jpeg' }
    ]
};

// Initialize cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in navbar
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = `(${cart.length})`;
    }
}

// Add product to cart
function addToCart(index, category) {
    const product = products[category][index];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} has been added to your cart.`);
}

// Load category products
function loadCategory() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const categoryName = document.getElementById('category-name');

    if (category && products[category]) {
        categoryName.textContent = category.charAt(0).toUpperCase() + category.slice(1) + ' Essentials';
        const productList = document.getElementById('product-list');

        products[category].forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <p>${product.name}</p>
                <span>₹${product.price}</span>
                <button onclick="addToCart(${index}, '${category}')">Add to Cart</button>
            `;
            productList.appendChild(productCard);
        });
    } else {
        // If no valid category, redirect to home
        window.location.href = 'index.html';
    }
}

// Display cart items
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        document.querySelector('.buy-now-button').style.display = 'none';
        document.getElementById('total-price').textContent = '0';
        return;
    }

    cartItemsContainer.innerHTML = '';
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>₹${item.price}</span>
        `;
        cartItemsContainer.appendChild(cartItem);
        totalPrice += item.price;
    });

    totalPriceEl.textContent = totalPrice;
    document.querySelector('.buy-now-button').style.display = 'inline-block';
}

// Display featured products on home page
function displayFeaturedProducts() {
    const featuredProductsContainer = document.getElementById('featured-products');
    const featured = [
        { name: 'Basmati Rice', price: 120, img: 'download (43).jpeg' },
        { name: 'Organic Lentils', price: 150, img: 'download (44).jpeg' },
        { name: 'Fresh Apples', price: 130, img: 'images (7).jpeg' }
    ];

    featured.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <p>${product.name}</p>
            <span>₹${product.price}</span>
            <button onclick="addFeaturedToCart('${product.name}')">Add to Cart</button>
        `;
        featuredProductsContainer.appendChild(productCard);
    });
}

// Add featured product to cart
function addFeaturedToCart(productName) {
    const product = products.household.concat(products.pantry, products.freshproduce, products.snacks, products.bakery).find(p => p.name === productName);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${product.name} has been added to your cart.`);
    }
}

// Handle form submission on checkout page
function handleFormSubmission(event) {
    event.preventDefault();
    // You can add form validation here if needed

    // Clear the cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    // Redirect to thank you page
    window.location.href = 'thankyou.html';
}

// Initialize the page based on current path
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        displayFeaturedProducts();
    } else if (window.location.pathname.endsWith('category.html')) {
        loadCategory();
    } else if (window.location.pathname.endsWith('cart.html')) {
        displayCart();
    } else if (window.location.pathname.endsWith('checkout.html')) {
        const form = document.getElementById('delivery-form');
        form.addEventListener('submit', handleFormSubmission);
    }
});
