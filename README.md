# Luxury E-Commerce Application
# Demo video:https://youtu.be/FPMhb3vHsvw?feature=shared
A modern, interactive e-commerce web application for selling luxury fashion items.

## Features

### Product Display and Navigation
- Responsive product card layout
- Product categorization
- Multiple sort options (price low to high, price high to low, alphabetical)
- Real-time search functionality by product name or category

### Shopping Cart Functionality
- Add items to cart with visual feedback
- Quantity tracking for duplicate items
- Cart count indicator
- Persistent cart during session

### Checkout Process
- Multi-step checkout flow
- Shipping information collection
- Payment information collection
- Order summary display
- Form validation
- Order confirmation with unique order number
- Estimated delivery date calculation

## Product Catalog

The application features a curated selection of luxury items:

| Product Name | Price | Category |
|--------------|-------|----------|
| Luxury Silk Shirt | $299.99 | Shirts |
| Designer Jeans | $449.95 | Pants |
| Cashmere Sweater | $599.99 | Sweaters |
| Italian Leather Jacket | $1,299.99 | Outerwear |
| Handcrafted Leather Shoes | $789.50 | Footwear |
| Diamond Cufflinks | $2,499.99 | Accessories |

## User Interface Components

### Main Page
- Product grid with category indicators
- Sorting dropdown menu
- Search box for filtering products
- Shopping cart button with item counter

### Cart Modal
- List of cart items with quantities
- Price calculations
- Checkout button
- Close button

### Checkout Form
- Shipping information section
- Payment information section
- Order summary section
- Back to cart option
- Place order button

### Order Confirmation
- Success indicator
- Order number
- Confirmation details
- Estimated delivery date

## API Integration

The application can be extended to work with the following API endpoints:

### Products API

#### Get All Products

GET /api/products

Returns the complete product catalog.

#### Get Product by ID

GET /api/products/{id}

Returns details for a specific product.

#### Filter Products

GET /api/products?category={category}&minPrice={min}&maxPrice={max}

Returns products filtered by category and/or price range.

### Cart API

#### Get Cart Contents

GET /api/cart

Returns the current user's cart contents.

#### Add to Cart

POST /api/cart

Adds a product to the cart.

Request body:
json
{
  "productId": 1,
  "quantity": 1
}


#### Update Cart Item

PUT /api/cart/{productId}

Updates the quantity of a product in the cart.

Request body:
json
{
  "quantity": 2
}


#### Remove from Cart

DELETE /api/cart/{productId}

Removes a product from the cart.

### Order API

#### Create Order

POST /api/orders

Creates a new order from the cart contents.

Request body:
json
{
  "shippingInfo": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St",
    "city": "New York",
    "zipCode": "10001"
  },
  "paymentInfo": {
    "cardNumber": "XXXX-XXXX-XXXX-XXXX",
    "expiryDate": "MM/YY",
    "cvv": "XXX"
  }
}


#### Get Order Status

GET /api/orders/{orderId}

Returns the status and details of a specific order.

## Technical Implementation

The application is built with vanilla JavaScript and follows these implementation patterns:

- DOM manipulation for dynamic content updates
- Event-driven architecture
- State management for cart and checkout process
- Form validation and processing
- Modal dialog for cart and checkout interfaces
- Fetch API for backend communication

## Getting Started

1. Include the JavaScript code in your project
2. Ensure the corresponding HTML elements exist in your page structure:
   - Products container (#products-container)
   - Sort select element (#sort-select)
   - Search box (.search-box)
   - Cart button (#cart-btn)
   - Cart modal (#cart-modal)
   - Other required elements as referenced in the code
3. Configure API endpoint URLs in the application settings

## Customization

You can extend the application by:
- Adding more products to the products array
- Creating additional sort or filter options
- Enhancing the checkout process with additional steps
- Implementing backend integration for order processing
- Expanding the API functionality with new endpoints
