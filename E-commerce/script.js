// /**
//  * Simple E-Commerce App Logic
//  * Simulates a Backend Database using localStorage and in-memory objects.
//  */
// const app = {
//     // --- DATA MOCK (Simulating Database) ---
//     data: {
//         products: [
//             { id: 1, name: "Minimalist Watch", price: 120.00, category: "Accessories", desc: "A sleek, modern timepiece with a leather strap.", image: "src/watch.jpeg" },
//             { id: 2, name: "Wireless Headphones", price: 250.00, category: "Electronics", desc: "Noise-cancelling over-ear headphones with 20h battery life.", image: "src/Headphones.jpeg" },
//             { id: 3, name: "Denim Jacket", price: 85.00, category: "Fashion", desc: "Classic vintage-style denim jacket.", image: "src/TV.jpeg" },
//             { id: 4, name: "Running Shoes", price: 110.00, category: "Footwear", desc: "Lightweight and breathable running sneakers.", image: "src/speaker.jpeg" },
//         ],
//         cart: [], // Array of { product, quantity }
//         user: null, // Logged in user object
//         orders: [] // Array of past orders
//     },

//     // --- INITIALIZATION ---
//     init: function () {
//         this.loadState();
//         this.renderProducts();
//         this.updateUI();
//         // Check if user is logged in via session storage
//         const sessionUser = sessionStorage.getItem('currentUser');
//         if (sessionUser) {
//             this.data.user = JSON.parse(sessionUser);
//             this.loadUserData();
//             this.updateUI();
//         }
//     },

//     // --- STATE MANAGEMENT (Simulated Database Persistence) ---
//     saveState: function () {
//         // In a real app, this would be API calls to Express/MongoDB
//         if (this.data.user) {
//             localStorage.setItem(`cart_${this.data.user.username}`, JSON.stringify(this.data.cart));
//             localStorage.setItem(`orders_${this.data.user.username}`, JSON.stringify(this.data.orders));
//         }
//         sessionStorage.setItem('currentUser', JSON.stringify(this.data.user));
//     },

//     loadState: function () {
//         // Loads generic state if needed
//     },

//     loadUserData: function () {
//         if (!this.data.user) return;
//         // Load user specific cart and orders from LocalStorage
//         const savedCart = localStorage.getItem(`cart_${this.data.user.username}`);
//         const savedOrders = localStorage.getItem(`orders_${this.data.user.username}`);

//         this.data.cart = savedCart ? JSON.parse(savedCart) : [];
//         this.data.orders = savedOrders ? JSON.parse(savedOrders) : [];
//     },

//     // --- ROUTING ---
//     router: function (viewName) {
//         // Hide all sections
//         document.querySelectorAll('main > section').forEach(el => el.classList.add('hidden'));
//         document.querySelectorAll('.nav-links button').forEach(el => el.classList.remove('active'));

//         // Show requested section
//         document.getElementById(`view-${viewName}`).classList.remove('hidden');

//         // Highlight nav
//         const navBtn = document.getElementById(`nav-${viewName}`);
//         if (navBtn) navBtn.classList.add('active');

//         // Render specific view logic
//         if (viewName === 'cart') this.renderCart();
//         if (viewName === 'orders') this.renderOrders();

//         window.scrollTo(0, 0);
//     },

//     // --- PRODUCT LOGIC ---
//     renderProducts: function () {
//         const container = document.getElementById('product-list');
//         container.innerHTML = this.data.products.map(p => `
//                     <div class="product-card">
//                         <img src="${p.image}" alt="${p.name}" class="product-img">
//                         <div class="product-info">
//                             <div class="product-title">${p.name}</div>
//                             <div class="product-price">$${p.price.toFixed(2)}</div>
//                             <div class="product-desc">${p.desc}</div>
//                             <div style="margin-top: auto; display: flex; gap: 10px;">
//                                 <button class="btn btn-outline" onclick="app.showProductDetails(${p.id})">Details</button>
//                                 <button class="btn btn-primary" onclick="app.addToCart(${p.id})">Add to Cart</button>
//                             </div>
//                         </div>
//                     </div>
          
//                 `).join('');
//     },



//     showProductDetails: function (id) {
//         const p = this.data.products.find(x => x.id === id);
//         if (!p) return;

//         const modalBody = document.getElementById('modal-body');
//         modalBody.innerHTML = `
//                     <img src="${p.image}" alt="${p.name}" style="width: 100%; border-radius: var(--radius); height: 300px; object-fit: cover;">
//                     <div class="modal-text">
//                         <h2 style="margin-bottom: 10px;">${p.name}</h2>
//                         <h3 style="color: var(--primary); margin-bottom: 20px;">$${p.price.toFixed(2)}</h3>
//                         <p style="margin-bottom: 20px; line-height: 1.8;">${p.desc} This product is made from high-quality materials ensuring durability and style. Perfect for daily use or as a gift.</p>
//                         <div style="background: #f1f5f9; padding: 10px; border-radius: 4px; margin-bottom: 20px;">
//                             <strong>Category:</strong> ${p.category}
//                         </div>
//                         <button class="btn btn-primary" onclick="app.addToCart(${p.id}); app.closeModal()">Add to Cart</button>
//                     </div>
//                 `;

//         document.getElementById('product-modal').classList.add('open');
//     },

//     closeModal: function () {
//         document.getElementById('product-modal').classList.remove('open');
//     },

//     // --- CART LOGIC ---
//     addToCart: function (productId) {
//         if (!this.data.user) {
//             this.showToast('Please login to shop', 'error');
//             this.router('auth');
//             return;
//         }

//         const product = this.data.products.find(p => p.id === productId);
//         const existingItem = this.data.cart.find(item => item.product.id === productId);

//         if (existingItem) {
//             existingItem.quantity++;
//         } else {
//             this.data.cart.push({ product: product, quantity: 1 });
//         }

//         this.saveState();
//         this.updateCartCount();
//         this.showToast(`Added ${product.name} to cart`, 'success');
//     },

//     removeFromCart: function (productId) {
//         this.data.cart = this.data.cart.filter(item => item.product.id !== productId);
//         this.saveState();
//         this.renderCart();
//         this.updateCartCount();
//     },

//     updateQuantity: function (productId, change) {
//         const item = this.data.cart.find(x => x.product.id === productId);
//         if (item) {
//             item.quantity += change;
//             if (item.quantity <= 0) {
//                 this.removeFromCart(productId);
//             } else {
//                 this.saveState();
//                 this.renderCart();
//             }
//         }
//     },

//     renderCart: function () {
//         const container = document.getElementById('cart-items-container');
//         if (this.data.cart.length === 0) {
//             container.innerHTML = `<p style="text-align: center; padding: 40px; color: var(--text-muted);">Your cart is empty. <br><br> <button class="btn btn-primary" onclick="app.router('home')">Start Shopping</button></p>`;
//             this.updateTotals(0);
//             return;
//         }

//         container.innerHTML = this.data.cart.map(item => `
//                     <div class="cart-item">
//                         <div class="flex">
//                             <img src="${item.product.image}" alt="${item.product.name}">
//                             <div>
//                                 <h4>${item.product.name}</h4>
//                                 <div style="color: var(--primary); font-weight: bold;">$${item.product.price.toFixed(2)}</div>
//                             </div>
//                         </div>
//                         <div class="flex">
//                             <div style="display: flex; align-items: center; border: 1px solid var(--border); border-radius: 4px; margin-right: 15px;">
//                                 <button onclick="app.updateQuantity(${item.product.id}, -1)" style="background:none; border:none; padding: 5px 10px; cursor:pointer;">-</button>
//                                 <span style="padding: 0 5px;">${item.quantity}</span>
//                                 <button onclick="app.updateQuantity(${item.product.id}, 1)" style="background:none; border:none; padding: 5px 10px; cursor:pointer;">+</button>
//                             </div>
//                             <button class="btn btn-danger" style="width: auto;" onclick="app.removeFromCart(${item.product.id})">&times;</button>
//                         </div>
//                     </div>
//                 `).join('');

//         const subtotal = this.data.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
//         this.updateTotals(subtotal);
//     },

//     updateTotals: function (subtotal) {
//         const tax = subtotal * 0.05;
//         const total = subtotal + tax;

//         document.getElementById('cart-subtotal').innerText = `$${subtotal.toFixed(2)}`;
//         document.getElementById('cart-tax').innerText = `$${tax.toFixed(2)}`;
//         document.getElementById('cart-total').innerText = `$${total.toFixed(2)}`;
//     },

//     updateCartCount: function () {
//         const count = this.data.cart.reduce((sum, item) => sum + item.quantity, 0);
//         document.getElementById('cart-count').innerText = count;
//     },

//     // --- CHECKOUT & ORDERS ---
//     processCheckout: function () {
//         if (this.data.cart.length === 0) {
//             this.showToast('Cart is empty!', 'error');
//             return;
//         }

//         const total = document.getElementById('cart-total').innerText;
//         const orderDate = new Date().toLocaleDateString();
//         const orderId = 'ORD-' + Date.now().toString().slice(-6);

//         // Create Order Object
//         const newOrder = {
//             id: orderId,
//             date: orderDate,
//             total: total,
//             items: [...this.data.cart]
//         };

//         // Save Order
//         this.data.orders.unshift(newOrder); // Add to beginning
//         this.data.cart = []; // Clear Cart

//         this.saveState();
//         this.updateCartCount();
//         this.router('orders');
//         this.showToast(`Order ${orderId} placed successfully!`, 'success');
//     },

//     renderOrders: function () {
//         const container = document.getElementById('orders-list');
//         if (this.data.orders.length === 0) {
//             container.innerHTML = `<p style="color: var(--text-muted);">No past orders found.</p>`;
//             return;
//         }

//         container.innerHTML = this.data.orders.map(order => `
//                     <div class="order-card">
//                         <div class="order-header">
//                             <span><strong>Order #${order.id}</strong></span>
//                             <span>${order.date}</span>
//                         </div>
//                         <div>
//                             ${order.items.map(item => `
//                                 <div class="order-item">
//                                     <span>${item.product.name} x ${item.quantity}</span>
//                                     <span>$${(item.product.price * item.quantity).toFixed(2)}</span>
//                                 </div>
//                             `).join('')}
//                         </div>
//                         <div style="text-align: right; margin-top: 10px; font-weight: bold; font-size: 1.1rem;">
//                             Total: ${order.total}
//                         </div>
//                     </div>
//                 `).join('');
//     },

//     // --- AUTHENTICATION ---
//     toggleAuthForm: function (type) {
//         if (type === 'login') {
//             document.getElementById('form-login').classList.remove('hidden');
//             document.getElementById('form-register').classList.add('hidden');
//         } else {
//             document.getElementById('form-login').classList.add('hidden');
//             document.getElementById('form-register').classList.remove('hidden');
//         }
//     },

//     handleRegister: function (e) {
//         e.preventDefault();
//         const user = document.getElementById('reg-username').value;
//         const pass = document.getElementById('reg-password').value;

//         // Simple simulated validation
//         if (localStorage.getItem(`user_${user}`)) {
//             this.showToast('Username already exists', 'error');
//             return;
//         }

//         // Save user to "DB" (localStorage)
//         localStorage.setItem(`user_${user}`, JSON.stringify({ username: user, password: pass }));

//         this.showToast('Registration successful! Please login.', 'success');
//         this.toggleAuthForm('login');
//         e.target.reset();
//     },

//     handleLogin: function (e) {
//         e.preventDefault();
//         const user = document.getElementById('login-username').value;
//         const pass = document.getElementById('login-password').value;

//         // Simulate DB Lookup
//         const storedUser = localStorage.getItem(`user_${user}`);

//         if (storedUser) {
//             const userData = JSON.parse(storedUser);
//             if (userData.password === pass) {
//                 this.data.user = userData;
//                 this.loadUserData();
//                 this.saveState();
//                 this.updateUI();
//                 this.router('home');
//                 this.showToast(`Welcome back, ${user}!`, 'success');
//                 e.target.reset();
//             } else {
//                 this.showToast('Incorrect password', 'error');
//             }
//         } else {
//             this.showToast('User not found', 'error');
//         }
//     },

//     logout: function () {
//         this.data.user = null;
//         this.data.cart = [];
//         this.data.orders = [];
//         sessionStorage.removeItem('currentUser');
//         this.updateUI();
//         this.router('home');
//         this.showToast('Logged out successfully', 'success');
//     },

//     updateUI: function () {
//         const isLoggedIn = !!this.data.user;

//         // Toggle Nav Items
//         document.getElementById('nav-auth').classList.toggle('hidden', isLoggedIn);
//         document.getElementById('nav-logout').classList.toggle('hidden', !isLoggedIn);
//         document.getElementById('nav-orders').classList.toggle('hidden', !isLoggedIn);

//         // Update Cart Count
//         this.updateCartCount();
//     },

//     // --- UTILITIES ---
//     showToast: function (message, type = 'success') {
//         const container = document.getElementById('toast-container');
//         const toast = document.createElement('div');
//         toast.className = `toast ${type}`;
//         toast.innerText = message;
//         container.appendChild(toast);

//         setTimeout(() => {
//             toast.style.opacity = '0';
//             setTimeout(() => toast.remove(), 300);
//         }, 3000);
//     }
// };

// // Initialize App on Load
// window.addEventListener('DOMContentLoaded', () => {
//     app.init();
// });










/**
 * Simple E-Commerce App Logic
 * Simulates a Backend Database using localStorage and in-memory objects.
 */

/* 
   === REQUIRED HTML UPDATES ===
   
   1. Add this section inside your <main> tag:
   
   <section id="view-clothes" class="hidden">
       <h2>Our Clothing Collection</h2>
       <div id="clothes-list" class="product-grid"></div>
   </section>

   2. Add this button to your Navigation bar (<nav>):
   
   <button id="nav-clothes" onclick="app.router('clothes')">Clothes</button>
*/

const app = {
    // --- DATA MOCK (Simulating Database) ---
    data: {
        // I cleaned up the duplicate array here.
        // I changed the Denim Jacket category to "Clothes" and added a Dress.
        products: [
            { id: 1, name: "Minimalist Watch", price: 50.00, category: "Accessories", desc: "This watch nails the minimalist aesthetic. The slim design and clean dial make it perfect for both workdays and weekends.", image: "src/watch.jpeg" },
            { id: 2, name: "Wireless Headphones", price: 200.00, category: "Electronics", desc: "Noise-cancelling over-ear headphones with 20h battery life.", image: "src/Headphones.jpeg" },
            { id: 3, name: "Smart Tv", price: 1000.00, category: "Clothes", desc: "A smart TV, also known as a connected TV (CTV or, rarely, CoTV [a] ), is a traditional television set with integrated Internet and interactive Web 2.0 features.", image: "src/TV.jpeg" },
            { id: 4, name: "Speaker", price: 110.00, category: "Footwear", desc: "A loudspeaker is a combination of one or more speaker drivers, an enclosure, and electrical connections The speaker driver is an electroacoustic transducer.", image: "src/speaker.jpeg" },
            { id: 5, name: "SmartPhones", price: 800.00, category: "Clothes", desc: "Smartphones are cellular devices with operating systems, web browsing and lots of apps. Learn how they're used in the enterprise and more..", image: "src/Mobile.jpeg" },
            { id: 6, name: "Podcast Mic", price: 180.00, category: "Clothes", desc: "Dual Mics with Noise Reduction, Low Latency & Real-Time Monitoring.", image: "src/Mic.jpeg" },
            { id: 7, name: "Mechanical Keyboard", price: 100.00, category: "Clothes", desc: "mechanical keyboards employ an individual switch under each key. This is what separates them from membrane keyboards.", image: "src/keyboard.jpeg" },
            { id: 8, name: "Gaming pc", price: 300.00, category: "Clothes", desc: "A gaming computer is a PC built with high-performance hardware to run video games at smooth frame rates and sharp graphics settings.", image: "src/PC.jpeg" }
        ],
        cart: [], // Array of { product, quantity }
        user: null, // Logged in user object
        orders: [] // Array of past orders
    },

    // --- INITIALIZATION ---
    init: function () {
        this.loadState();
        this.renderProducts();
        this.updateUI();
        // Check if user is logged in via session storage
        const sessionUser = sessionStorage.getItem('currentUser');
        if (sessionUser) {
            this.data.user = JSON.parse(sessionUser);
            this.loadUserData();
            this.updateUI();
        }
    },

    // --- STATE MANAGEMENT (Simulated Database Persistence) ---
    saveState: function () {
        // In a real app, this would be API calls to Express/MongoDB
        if (this.data.user) {
            localStorage.setItem(`cart_${this.data.user.username}`, JSON.stringify(this.data.cart));
            localStorage.setItem(`orders_${this.data.user.username}`, JSON.stringify(this.data.orders));
        }
        sessionStorage.setItem('currentUser', JSON.stringify(this.data.user));
    },

    loadState: function () {
        // Loads generic state if needed
    },

    loadUserData: function () {
        if (!this.data.user) return;
        // Load user specific cart and orders from LocalStorage
        const savedCart = localStorage.getItem(`cart_${this.data.user.username}`);
        const savedOrders = localStorage.getItem(`orders_${this.data.user.username}`);

        this.data.cart = savedCart ? JSON.parse(savedCart) : [];
        this.data.orders = savedOrders ? JSON.parse(savedOrders) : [];
    },

    // --- ROUTING ---
    router: function (viewName) {
        // Hide all sections
        document.querySelectorAll('main > section').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.nav-links button').forEach(el => el.classList.remove('active'));

        // Show requested section
        document.getElementById(`view-${viewName}`).classList.remove('hidden');

        // Highlight nav
        const navBtn = document.getElementById(`nav-${viewName}`);
        if (navBtn) navBtn.classList.add('active');

        // Render specific view logic
        if (viewName === 'cart') this.renderCart();
        if (viewName === 'orders') this.renderOrders();
        
        // --- ADDED: Handle clothes section rendering ---
        if (viewName === 'clothes') this.renderClothes();

        window.scrollTo(0, 0);
    },

    // --- PRODUCT LOGIC ---
    renderProducts: function () {
        const container = document.getElementById('product-list');
        container.innerHTML = this.data.products.map(p => `
                    <div class="product-card">
                        <img src="${p.image}" alt="${p.name}" class="product-img">
                        <div class="product-info">
                            <div class="product-title">${p.name}</div>
                            <div class="product-price">$${p.price.toFixed(2)}</div>
                            <div class="product-desc">${p.desc}</div>
                            <div style="margin-top: auto; display: flex; gap: 10px;">
                                <button class="btn btn-outline" onclick="app.showProductDetails(${p.id})">Details</button>
                                <button class="btn btn-primary" onclick="app.addToCart(${p.id})">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                `).join('');
    },

    // --- ADDED: Render Clothes Section ---
    renderClothes: function () {
        const container = document.getElementById('clothes-list');
        
        // Filter products where category is 'Clothes'
        const clothesItems = this.data.products.filter(p => p.category === 'Clothes');

        if (clothesItems.length === 0) {
            container.innerHTML = `<p>No clothes available at the moment.</p>`;
            return;
        }

        container.innerHTML = clothesItems.map(p => `
                    <div class="product-card">
                        <img src="${p.image}" alt="${p.name}" class="product-img">
                        <div class="product-info">
                            <div class="product-title">${p.name}</div>
                            <div class="product-price">$${p.price.toFixed(2)}</div>
                            <div class="product-desc">${p.desc}</div>
                            <div style="margin-top: auto; display: flex; gap: 10px;">
                                <button class="btn btn-outline" onclick="app.showProductDetails(${p.id})">Details</button>
                                <button class="btn btn-primary" onclick="app.addToCart(${p.id})">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                `).join('');
    },

    showProductDetails: function (id) {
        const p = this.data.products.find(x => x.id === id);
        if (!p) return;

        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
                    <img src="${p.image}" alt="${p.name}" style="width: 100%; border-radius: var(--radius); height: 300px; object-fit: cover;">
                    <div class="modal-text">
                        <h2 style="margin-bottom: 10px;">${p.name}</h2>
                        <h3 style="color: var(--primary); margin-bottom: 20px;">$${p.price.toFixed(2)}</h3>
                        <p style="margin-bottom: 20px; line-height: 1.8;">${p.desc} This product is made from high-quality materials ensuring durability and style. Perfect for daily use or as a gift.</p>
                        <div style="background: #f1f5f9; padding: 10px; border-radius: 4px; margin-bottom: 20px;">
                            <strong>Category:</strong> ${p.category}
                        </div>
                        <button class="btn btn-primary" onclick="app.addToCart(${p.id}); app.closeModal()">Add to Cart</button>
                    </div>
                `;

        document.getElementById('product-modal').classList.add('open');
    },

    closeModal: function () {
        document.getElementById('product-modal').classList.remove('open');
    },

    // --- CART LOGIC ---
    addToCart: function (productId) {
        if (!this.data.user) {
            this.showToast('Please login to shop', 'error');
            this.router('auth');
            return;
        }

        const product = this.data.products.find(p => p.id === productId);
        const existingItem = this.data.cart.find(item => item.product.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.data.cart.push({ product: product, quantity: 1 });
        }

        this.saveState();
        this.updateCartCount();
        this.showToast(`Added ${product.name} to cart`, 'success');
    },

    removeFromCart: function (productId) {
        this.data.cart = this.data.cart.filter(item => item.product.id !== productId);
        this.saveState();
        this.renderCart();
        this.updateCartCount();
    },

    updateQuantity: function (productId, change) {
        const item = this.data.cart.find(x => x.product.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.saveState();
                this.renderCart();
            }
        }
    },

    renderCart: function () {
        const container = document.getElementById('cart-items-container');
        if (this.data.cart.length === 0) {
            container.innerHTML = `<p style="text-align: center; padding: 40px; color: var(--text-muted);">Your cart is empty. <br><br> <button class="btn btn-primary" onclick="app.router('home')">Start Shopping</button></p>`;
            this.updateTotals(0);
            return;
        }

        container.innerHTML = this.data.cart.map(item => `
                    <div class="cart-item">
                        <div class="flex">
                            <img src="${item.product.image}" alt="${item.product.name}">
                            <div>
                                <h4>${item.product.name}</h4>
                                <div style="color: var(--primary); font-weight: bold;">$${item.product.price.toFixed(2)}</div>
                            </div>
                        </div>
                        <div class="flex">
                            <div style="display: flex; align-items: center; border: 1px solid var(--border); border-radius: 4px; margin-right: 15px;">
                                <button onclick="app.updateQuantity(${item.product.id}, -1)" style="background:none; border:none; padding: 5px 10px; cursor:pointer;">-</button>
                                <span style="padding: 0 5px;">${item.quantity}</span>
                                <button onclick="app.updateQuantity(${item.product.id}, 1)" style="background:none; border:none; padding: 5px 10px; cursor:pointer;">+</button>
                            </div>
                            <button class="btn btn-danger" style="width: auto;" onclick="app.removeFromCart(${item.product.id})">&times;</button>
                        </div>
                    </div>
                `).join('');

        const subtotal = this.data.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        this.updateTotals(subtotal);
    },

    updateTotals: function (subtotal) {
        const tax = subtotal * 0.05;
        const total = subtotal + tax;

        document.getElementById('cart-subtotal').innerText = `$${subtotal.toFixed(2)}`;
        document.getElementById('cart-tax').innerText = `$${tax.toFixed(2)}`;
        document.getElementById('cart-total').innerText = `$${total.toFixed(2)}`;
    },

    updateCartCount: function () {
        const count = this.data.cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cart-count').innerText = count;
    },

    // --- CHECKOUT & ORDERS ---
    processCheckout: function () {
        if (this.data.cart.length === 0) {
            this.showToast('Cart is empty!', 'error');
            return;
        }

        const total = document.getElementById('cart-total').innerText;
        const orderDate = new Date().toLocaleDateString();
        const orderId = 'ORD-' + Date.now().toString().slice(-6);

        // Create Order Object
        const newOrder = {
            id: orderId,
            date: orderDate,
            total: total,
            items: [...this.data.cart]
        };

        // Save Order
        this.data.orders.unshift(newOrder); // Add to beginning
        this.data.cart = []; // Clear Cart

        this.saveState();
        this.updateCartCount();
        this.router('orders');
        this.showToast(`Order ${orderId} placed successfully!`, 'success');
    },

    renderOrders: function () {
        const container = document.getElementById('orders-list');
        if (this.data.orders.length === 0) {
            container.innerHTML = `<p style="color: var(--text-muted);">No past orders found.</p>`;
            return;
        }

        container.innerHTML = this.data.orders.map(order => `
                    <div class="order-card">
                        <div class="order-header">
                            <span><strong>Order #${order.id}</strong></span>
                            <span>${order.date}</span>
                        </div>
                        <div>
                            ${order.items.map(item => `
                                <div class="order-item">
                                    <span>${item.product.name} x ${item.quantity}</span>
                                    <span>$${(item.product.price * item.quantity).toFixed(2)}</span>
                                </div>
                            `).join('')}
                        </div>
                        <div style="text-align: right; margin-top: 10px; font-weight: bold; font-size: 1.1rem;">
                            Total: ${order.total}
                        </div>
                    </div>
                `).join('');
    },

    // --- AUTHENTICATION ---
    toggleAuthForm: function (type) {
        if (type === 'login') {
            document.getElementById('form-login').classList.remove('hidden');
            document.getElementById('form-register').classList.add('hidden');
        } else {
            document.getElementById('form-login').classList.add('hidden');
            document.getElementById('form-register').classList.remove('hidden');
        }
    },

    handleRegister: function (e) {
        e.preventDefault();
        const user = document.getElementById('reg-username').value;
        const pass = document.getElementById('reg-password').value;

        // Simple simulated validation
        if (localStorage.getItem(`user_${user}`)) {
            this.showToast('Username already exists', 'error');
            return;
        }

        // Save user to "DB" (localStorage)
        localStorage.setItem(`user_${user}`, JSON.stringify({ username: user, password: pass }));

        this.showToast('Registration successful! Please login.', 'success');
        this.toggleAuthForm('login');
        e.target.reset();
    },

    handleLogin: function (e) {
        e.preventDefault();
        const user = document.getElementById('login-username').value;
        const pass = document.getElementById('login-password').value;

        // Simulate DB Lookup
        const storedUser = localStorage.getItem(`user_${user}`);

        if (storedUser) {
            const userData = JSON.parse(storedUser);
            if (userData.password === pass) {
                this.data.user = userData;
                this.loadUserData();
                this.saveState();
                this.updateUI();
                this.router('home');
                this.showToast(`Welcome back, ${user}!`, 'success');
                e.target.reset();
            } else {
                this.showToast('Incorrect password', 'error');
            }
        } else {
            this.showToast('User not found', 'error');
        }
    },

    logout: function () {
        this.data.user = null;
        this.data.cart = [];
        this.data.orders = [];
        sessionStorage.removeItem('currentUser');
        this.updateUI();
        this.router('home');
        this.showToast('Logged out successfully', 'success');
    },

    updateUI: function () {
        const isLoggedIn = !!this.data.user;

        // Toggle Nav Items
        document.getElementById('nav-auth').classList.toggle('hidden', isLoggedIn);
        document.getElementById('nav-logout').classList.toggle('hidden', !isLoggedIn);
        document.getElementById('nav-orders').classList.toggle('hidden', !isLoggedIn);

        // Update Cart Count
        this.updateCartCount();
    },

    // --- UTILITIES ---
    showToast: function (message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerText = message;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// Initialize App on Load
window.addEventListener('DOMContentLoaded', () => {
    app.init();
});