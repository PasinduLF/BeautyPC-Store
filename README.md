## Beauty P&C Store

A lightweight e-commerce platform for Beauty P&C (Sri Lanka) featuring a customer storefront, cart & checkout with Cash on Delivery, and an admin portal for managing products, categories, and orders.

### Project Structure

```
beauty-pc-store/
├── backend/          # Node.js + Express REST API
├── frontend/         # React + Vite + Tailwind storefront & admin UI
└── sql/
    ├── schema.sql    # Database schema
    └── sample_data.sql
```

---

## Backend (Express API)

**Tech**: Node.js, Express, MySQL, JWT auth, mysql2.

### Setup

```bash
cd backend
npm install
cp env.example .env  # create and adjust values manually
npm run dev          # or npm start for production
```

Environment variables (`env.example`):

```
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=beauty_pc_store
JWT_SECRET=supersecretkey
CLIENT_URL=http://localhost:5173
```

### Key Routes (Product CRUD, Orders, Admin Auth)

```js
// src/routes/productRoutes.js
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', authMiddleware, productValidators, productController.createProduct);
router.put('/:id', authMiddleware, productValidators, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

// src/routes/orderRoutes.js
router.post('/', checkoutValidators, orderController.createOrder);          // public COD checkout
router.get('/', authMiddleware, orderController.listOrders);                // admin list
router.get('/dashboard/summary', authMiddleware, orderController.getDashboardSummary);
router.get('/:id', authMiddleware, orderController.getOrder);
router.patch('/:id/status', authMiddleware, orderController.updateStatus);

// src/routes/authRoutes.js
router.post('/login', [body('email').isEmail(), body('password').notEmpty()], login);
```

Order creation logic (`src/controllers/orderController.js`) validates customer info, hydrates cart items with live product prices, and stores the order + items inside a SQL transaction (`src/models/orderModel.js`).

### Folder Layout

```
backend/src
├── app.js               # Express instance, middleware, routes
├── server.js            # Bootstraps DB and server
├── config/db.js         # mysql2 connection pool
├── controllers/         # auth, product, category, order logic
├── models/              # SQL helpers (users, categories, products, orders)
├── routes/              # REST endpoints
└── middleware/          # auth + error handlers
```

---

## Frontend (React + Vite)

**Tech**: React, React Router, TailwindCSS, Axios, Context API.

### Setup

```bash
cd frontend
npm install
cp env.example .env    # set VITE_API_BASE_URL
npm run dev
```

Tailwind is pre-configured in `tailwind.config.js` and `postcss.config.js`.

### Pages & Components

- `Home`, `CategoryPage`, `ProductDetails`, `CartPage`, `CheckoutPage`
- Admin suite: `AdminLogin`, `AdminDashboard`, `AdminProducts` (includes category CRUD), `AdminOrders`
- Shared UI: `Navbar`, `Hero`, `CategoryList`, `ProductGrid`, `CartItem`, `OrderSummary`, `AdminSidebar`, `OrderTable`, etc.

Example storefront components:

```
src/components/ProductGrid.jsx
src/components/ProductCard.jsx
src/pages/ProductDetails.jsx
src/pages/CartPage.jsx
src/pages/CheckoutPage.jsx
```

Admin management components:

```
src/pages/AdminProducts.jsx   # product + category CRUD
src/pages/AdminOrders.jsx     # order list + status updates
src/pages/AdminDashboard.jsx  # today stats + recent orders
```

### State & Services

- `context/CartContext.jsx`: cart state persisted to `localStorage`.
- `context/AdminAuthContext.jsx`: tracks JWT + admin info.
- `hooks/useCart`, `hooks/useForm`, `hooks/useCurrency`.
- `services/`: Axios client plus product/category/order/auth API helpers.

Routes are defined in `src/App.jsx` and guarded admin routes use `ProtectedRoute`.

---

## Database

1. Create schema & seed sample data:

```bash
mysql -u root -p < sql/schema.sql
mysql -u root -p < sql/sample_data.sql
```

2. Sample admin credentials: `admin@beautypc.lk` / `password123` (change the bcrypt hash after first login).

Tables: `users`, `categories`, `products`, `orders`, `order_items`. All foreign keys cascade on delete.

---

## Development Workflow

1. Start MySQL server and import schema/data.
2. Configure backend `.env`, then run `npm run dev` (port 5000).
3. Configure frontend `.env`, run `npm run dev` (port 5173).
4. Visit `http://localhost:5173` for storefront, `/admin/login` for admin.

### Recommended Enhancements

- Add image uploads (S3/Cloudinary) instead of URL inputs.
- Integrate email or WhatsApp notifications on new orders.
- Extend payment methods beyond COD with gateway integrations.
- Add customer authentication and order history.

This repo is intentionally lightweight so Beauty P&C staff can customize quickly—feel free to adapt the styling, copy, and data model for additional requirements.

admin@beautypc.lk
Beauty2025!