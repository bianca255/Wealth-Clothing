// Sample product data
const products = [
    {
        id: 1,
        name: "Luxury Silk Shirt",
        price: 299.99,
        category: "Shirts"
    },
    {
        id: 2,
        name: "Designer Jeans",
        price: 449.95,
        category: "Pants"
    },
    {
        id: 3,
        name: "Cashmere Sweater",
        price: 599.99,
        category: "Sweaters"
    },
    {
        id: 4,
        name: "Italian Leather Jacket",
        price: 1299.99,
        category: "Outerwear"
    },
    {
        id: 5,
        name: "Handcrafted Leather Shoes",
        price: 789.50,
        category: "Footwear"
    },
    {
        id: 6,
        name: "Diamond Cufflinks",
        price: 2499.99,
        category: "Accessories"
    }
];

// Initialize application state
let cart = [];
let checkoutMode = false;

// DOM elements
const productsContainer = document.getElementById('products-container');
const sortSelect = document.getElementById('sort-select');
const searchBox = document.querySelector('.search-box');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeModal = document.querySelector('.close-modal');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartCountElement = document.querySelector('.cart-count');
const cartTotalElement = document.getElementById('cart-total');
const checkoutBtn = document.querySelector('.checkout-btn');

// Display products
function displayProducts(productsArray) {
    productsContainer.innerHTML = '';
    
    productsArray.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-placeholder">${product.category}</div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });
    
    // Add event listeners to buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Sort products
function sortProducts() {
    const sortValue = sortSelect.value;
    let sortedProducts = [...products];
    
    switch(sortValue) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Default sort (by id/original order)
            sortedProducts.sort((a, b) => a.id - b.id);
    }
    
    displayProducts(sortedProducts);
}

// Search products
function searchProducts() {
    const searchTerm = searchBox.value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        displayProducts(products);
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.category.toLowerCase().includes(searchTerm)
    );
    
    displayProducts(filteredProducts);
}

// Add to cart
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    
    updateCartUI();
    
    // Show quick feedback
    e.target.textContent = 'Added!';
    setTimeout(() => {
        e.target.textContent = 'Add to Cart';
    }, 1000);
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    
    // Update cart modal
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
        cartTotalElement.textContent = '0.00';
        checkoutBtn.disabled = true;
        checkoutBtn.classList.add('disabled');
        return;
    }
    
    checkoutBtn.disabled = false;
    checkoutBtn.classList.remove('disabled');
    
    let total = 0;
    
    if (checkoutMode) {
        displayCheckoutForm(total);
        return;
    }
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>
                <strong>${item.name}</strong> x ${item.quantity}
            </div>
            <div>$${itemTotal.toFixed(2)}</div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    cartTotalElement.textContent = total.toFixed(2);
}

// Display checkout form
function displayCheckoutForm(total) {
    // Calculate cart total
    total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const modalContent = document.querySelector('.modal-content');
    const modalHeader = document.querySelector('.modal-header');
    
    // Update header
    modalHeader.querySelector('h2').textContent = 'Checkout';
    
    // Create checkout form
    cartItemsContainer.innerHTML = `
        <div class="checkout-form">
            <h3>Shipping Information</h3>
            <div class="form-group">
                <label for="fullname">Full Name</label>
                <input type="text" id="fullname" placeholder="Enter your full name">
            </div>
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" placeholder="Enter your email">
            </div>
            <div class="form-group">
                <label for="address">Shipping Address</label>
                <textarea id="address" rows="3" placeholder="Enter your complete address"></textarea>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="city">City</label>
                    <input type="text" id="city" placeholder="City">
                </div>
                <div class="form-group">
                    <label for="zip">Zip Code</label>
                    <input type="text" id="zip" placeholder="Zip Code">
                </div>
            </div>
            
            <h3>Payment Information</h3>
            <div class="form-group">
                <label for="card">Card Number</label>
                <input type="text" id="card" placeholder="XXXX XXXX XXXX XXXX">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="expiry">Expiry Date</label>
                    <input type="text" id="expiry" placeholder="MM/YY">
                </div>
                <div class="form-group">
                    <label for="cvv">CVV</label>
                    <input type="text" id="cvv" placeholder="XXX">
                </div>
            </div>
            
            <div class="order-summary">
                <h3>Order Summary</h3>
                <div class="order-items">
                    ${cart.map(item => `
                        <div class="order-item">
                            <span>${item.name} x ${item.quantity}</span>
                            <span>$${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-total">
                    <span>Total:</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    `;
    
    // Update total
    cartTotalElement.textContent = total.toFixed(2);
    
    // Update button text
    checkoutBtn.textContent = 'Place Order';
    
    // Add back button
    const backButton = document.createElement('button');
    backButton.className = 'back-button';
    backButton.textContent = 'Back to Cart';
    backButton.addEventListener('click', () => {
        checkoutMode = false;
        checkoutBtn.textContent = 'Proceed to Checkout';
        modalHeader.querySelector('h2').textContent = 'Your Cart';
        
        // Remove back button if exists
        const existingBackButton = document.querySelector('.back-button');
        if (existingBackButton) {
            existingBackButton.remove();
        }
        
        updateCartUI();
    });
    
    // Add back button if not already added
    if (!document.querySelector('.back-button')) {
        modalHeader.appendChild(backButton);
    }
}

// Process order
function processOrder() {
    // Simple validation
    const fullname = document.getElementById('fullname')?.value;
    const email = document.getElementById('email')?.value;
    const address = document.getElementById('address')?.value;
    
    if (!fullname || !email || !address) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Show order confirmation
    const modalContent = document.querySelector('.modal-content');
    const modalHeader = document.querySelector('.modal-header');
    
    // Update header
    modalHeader.querySelector('h2').textContent = 'Order Confirmation';
    
    // Remove back button if exists
    const existingBackButton = document.querySelector('.back-button');
    if (existingBackButton) {
        existingBackButton.remove();
    }
    
    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Show confirmation message
    cartItemsContainer.innerHTML = `
        <div class="order-confirmation">
            <div class="confirmation-icon">✓</div>
            <h3>Thank You for Your Order!</h3>
            <p>Order #WC${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
            <p>We've sent a confirmation email to ${email}</p>
            <div class="order-summary-small">
                <p>Order Total: $${total.toFixed(2)}</p>
                <p>Estimated Delivery: ${getEstimatedDelivery()}</p>
            </div>
        </div>
    `;
    
    // Update button text
    checkoutBtn.textContent = 'Continue Shopping';
    
    // Empty the cart
    cart = [];
    updateCartCount();
    
    // Change button function
    checkoutBtn.removeEventListener('click', handleCheckoutClick);
    checkoutBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
        checkoutMode = false;
        
        // Reset button
        checkoutBtn.textContent = 'Proceed to Checkout';
        checkoutBtn.removeEventListener('click', continueShoppingClick);
        checkoutBtn.addEventListener('click', handleCheckoutClick);
        
        // Reset header
        modalHeader.querySelector('h2').textContent = 'Your Cart';
        
        // Refresh product display
        displayProducts(products);
    });
}

// Helper function to get estimated delivery date
function getEstimatedDelivery() {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 3); // 3 days for premium shipping
    
    // Format date as "Month Day, Year"
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return deliveryDate.toLocaleDateString('en-US', options);
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

// Handle checkout button click
function handleCheckoutClick() {
    if (cart.length === 0) {
        return;
    }
    
    if (!checkoutMode) {
        checkoutMode = true;
        updateCartUI();
    } else {
        processOrder();
    }
}

// Continue shopping click handler
function continueShoppingClick() {
    cartModal.style.display = 'none';
    checkoutMode = false;
    checkoutBtn.textContent = 'Proceed to Checkout';
}

// Event listeners
sortSelect.addEventListener('change', sortProducts);
searchBox.addEventListener('input', searchProducts);

cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
    
    // Reset checkout mode when closing modal
    if (checkoutMode) {
        checkoutMode = false;
        checkoutBtn.textContent = 'Proceed to Checkout';
        document.querySelector('.modal-header h2').textContent = 'Your Cart';
        
        // Remove back button if exists
        const existingBackButton = document.querySelector('.back-button');
        if (existingBackButton) {
            existingBackButton.remove();
        }
        
        updateCartUI();
    }
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
        
        // Reset checkout mode when closing modal
        if (checkoutMode) {
            checkoutMode = false;
            checkoutBtn.textContent = 'Proceed to Checkout';
            document.querySelector('.modal-header h2').textContent = 'Your Cart';
            
            // Remove back button if exists
            const existingBackButton = document.querySelector('.back-button');
            if (existingBackButton) {
                existingBackButton.remove();
            }
            
            updateCartUI();
        }
    }
});

// Add checkout button event listener
checkoutBtn.addEventListener('click', handleCheckoutClick);

// Initialize app
displayProducts(products);