// Sample dataset: 10 fruit products
const products = [
  { id: 1, name: 'Apple', emoji: '🍎', description: 'Crisp and sweet apple', price: 1.0, unit: 'each' },
  { id: 2, name: 'Banana', emoji: '🍌', description: 'Fresh ripe banana', price: 0.5, unit: 'each' },
  { id: 3, name: 'Orange', emoji: '🍊', description: 'Juicy orange', price: 0.8, unit: 'each' },
  { id: 4, name: 'Strawberry', emoji: '🍓', description: 'Sweet strawberries', price: 2.5, unit: 'lb' },
  { id: 5, name: 'Grapes', emoji: '🍇', description: 'Seedless grapes', price: 2.0, unit: 'lb' },
  { id: 6, name: 'Watermelon', emoji: '🍉', description: 'Refreshing watermelon', price: 4.0, unit: 'each' },
  { id: 7, name: 'Lemon', emoji: '🍋', description: 'Tangy lemon', price: 0.7, unit: 'each' },
  { id: 8, name: 'Pineapple', emoji: '🍍', description: 'Tropical pineapple', price: 3.0, unit: 'each' },
  { id: 9, name: 'Peach', emoji: '🍑', description: 'Juicy peach', price: 1.2, unit: 'each' },
  { id: 10, name: 'Cherry', emoji: '🍒', description: 'Sweet cherries', price: 3.5, unit: 'lb' }
];


let cart = [];
let currentPage = 'products';
let selectedProductId = null;
let notification = '';
let notificationTimeout = null;

function renderNav() {
  const navItems = [
    { page: 'products', label: 'Products', abbr: 'P', emoji: '🍎' },
    { page: 'productdetails', label: 'Product Details', abbr: 'D', emoji: '🔍' },
    { page: 'cart', label: 'Shopping Cart', abbr: 'C', emoji: '🛒' },
    { page: 'checkout', label: 'Checkout', abbr: 'O', emoji: '💳' }
  ];
  const collapsed = window.innerWidth < 600;
  return `<nav class="${collapsed ? 'collapsed' : ''}"><ul>\n${navItems.map(item => {
    let badge = '';
    if (item.page === 'cart' && cart.length > 0) {
      const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
      badge = `<span class="cart-badge">${totalQty}</span>`;
    }
    return `
    <li class="${currentPage === item.page ? 'active' : ''}" onclick="navigate('${item.page}')">
      <span class="nav-emoji">${item.emoji}${badge}</span><span class="abbr">${item.abbr}</span><span class="label">${item.label}</span>
    </li>`;
  }).join('')}\n</ul></nav>`;
}

function navigate(page, productId) {
  currentPage = page;
  if (productId) selectedProductId = productId;
  renderApp();
}

function renderProducts() {
  return `<div class="product-list">\n${products.map(product => `
    <div class="product-card">
      <div class="emoji">${product.emoji}</div>
      <div><strong>${product.name}</strong></div>
      <div>$${product.price.toFixed(2)}/${product.unit}</div>
      <button onclick="navigate('productdetails', ${product.id})">Details</button>
      <div style="margin-top:8px;">
        <input type="number" min="1" value="1" id="qty-${product.id}" style="width:48px;">
        <button onclick="addToCart(${product.id})">Add</button>
      </div>
    </div>`).join('')}\n</div>`;
}

function renderProductDetails() {
  const product = products.find(p => p.id === selectedProductId) || products[0];
  return `<div style="max-width:400px;margin:0 auto;">
    <div class="emoji" style="font-size:3rem;text-align:center;">${product.emoji}</div>
    <h2>${product.name}</h2>
    <div>${product.description}</div>
    <div style="margin:8px 0;">Price: $${product.price.toFixed(2)}/${product.unit}</div>
    <div style="margin-bottom:12px;">
      <input type="number" min="1" value="1" id="details-qty" style="width:48px;">
      <button onclick="addToCart(${product.id}, true)">Add to Cart</button>
    </div>
    <button onclick="navigate('products')">Back to Products</button>
  </div>`;
}

function renderCart() {
  if (cart.length === 0) {
    return `<div class="cart-list"><div>Your cart is empty.</div></div>`;
  }
  return `<div class="cart-list">\n${cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return `<div class="cart-item">
      <span>${product.emoji} ${product.name}</span>
      <span>
        <input type="number" min="1" value="${item.qty}" onchange="updateCartQty(${item.productId}, this.value)">
        $${(product.price * item.qty).toFixed(2)}
        <button onclick="removeFromCart(${item.productId})">✕</button>
      </span>
    </div>`;
  }).join('')}\n<div style="text-align:right;font-weight:bold;margin-top:10px;">Total: $${cartTotal().toFixed(2)}</div>\n</div>`;
}

function renderCheckout() {
  if (cart.length === 0) {
    return `<div class="checkout-list"><div>Your cart is empty.</div></div>`;
  }
  return `<div class="checkout-list">\n${cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return `<div class="checkout-item">
      <span>${product.emoji} ${product.name} x ${item.qty}</span>
      <span>$${(product.price * item.qty).toFixed(2)}</span>
    </div>`;
  }).join('')}\n<div style="text-align:right;font-weight:bold;margin-top:10px;">Total: $${cartTotal().toFixed(2)}</div>\n<button style="margin-top:16px;width:100%;" onclick="processOrder()">Process Order</button>\n</div>`;
}

function cartTotal() {
  return cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + product.price * item.qty;
  }, 0);
}

function showNotification(msg, duration = 2500) {
  notification = msg;
  renderApp();
  if (notificationTimeout) clearTimeout(notificationTimeout);
  notificationTimeout = setTimeout(() => {
    notification = '';
    renderApp();
  }, duration);
}

function addToCart(productId, fromDetails) {
  const qtyInputId = fromDetails ? 'details-qty' : `qty-${productId}`;
  const qty = parseInt(document.getElementById(qtyInputId).value, 10) || 1;
  const existing = cart.find(item => item.productId === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ productId, qty });
  }
  showNotification('Added to cart!');
}
}

function updateCartQty(productId, qty) {
  qty = Math.max(1, parseInt(qty, 10) || 1);
  const item = cart.find(i => i.productId === productId);
  if (item) item.qty = qty;
  renderApp();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.productId !== productId);
  showNotification('Removed from cart.');
}

  cart = [];
  showNotification('Thank you! Your order has been processed.', 3500);
  navigate('products');
}

function renderMainContent() {
  switch (currentPage) {
    case 'products':
      return renderProducts();
    case 'productdetails':
      return renderProductDetails();
    case 'cart':
      return renderCart();
    case 'checkout':
      return renderCheckout();
    default:
      return renderProducts();
  }
}

  const app = document.getElementById('app');
  app.innerHTML = `
    <div id="container">
      ${renderNav()}
      <div id="main-content">${renderMainContent()}</div>
    </div>
    ${notification ? `<div class="notification-banner">${notification}</div>` : ''}
  `;
}

window.addEventListener('resize', () => {
  renderApp();
});

window.navigate = navigate;
window.addToCart = addToCart;
window.updateCartQty = updateCartQty;
window.removeFromCart = removeFromCart;
window.processOrder = processOrder;

// Initial render
renderApp();
