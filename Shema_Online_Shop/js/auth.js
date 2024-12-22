document.addEventListener('DOMContentLoaded', function() {
    // Auth Modal
    const authButton = document.getElementById('authButton');
    const authModal = document.getElementById('authModal');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');

    // Cart
    const cartButton = document.getElementById('cartButton');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.querySelector('.close-cart');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total span:last-child');
    let cart = [];

    // Auth Modal Functions
    authButton.addEventListener('click', () => {
        authModal.classList.add('active');
    });

    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.classList.remove('active');
        }
    });

    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            // Update tabs
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update forms
            authForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${tabName}Form`) {
                    form.classList.add('active');
                }
            });
        });
    });

    // Handle form submissions
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your login logic here
        console.log('Login submitted');
        authModal.classList.remove('active');
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your signup logic here
        console.log('Signup submitted');
        authModal.classList.remove('active');
    });

    // Cart Functions
    cartButton.addEventListener('click', () => {
        cartModal.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });

    function addToCart(product) {
        cart.push(product);
        updateCart();
    }

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">RWF ${item.price}</p>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            cartItems.appendChild(cartItem);
            total += item.price;
        });

        cartTotal.textContent = `RWF ${total}`;
        document.querySelector('.cart-count').textContent = cart.length;
    }

    // Add to cart button functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.product-card');
            const product = {
                id: Date.now(),
                name: card.querySelector('h3').textContent,
                price: parseInt(card.querySelector('.price').textContent.replace('RWF ', '')),
                image: card.querySelector('img').src
            };
            addToCart(product);
        });
    });
}); 