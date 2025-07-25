# QuickShop

QuickShop is a modern e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js) and integrated with Stripe for secure payments. It allows users to browse products, add them to a cart, and proceed to checkout. The application features a responsive UI with Tailwind CSS, pagination, toast notifications, and accessibility support.

## Features

- **Product Browsing**: View products fetched from the Fake Store API.
- **Cart Management**: Add, update, or remove items from the cart.
- **Secure Checkout**: Process payments via Stripe with email confirmation.
- **Authentication**: User registration, login, and profile retrieval with JWT-based authentication.
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS.
- **Error Handling**: Toast notifications and loading states for a smooth UX.
- **Accessibility**: ARIA labels and keyboard navigation support.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Axios, React Router, React Hot Toast, Heroicons, Stripe React SDK
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JSON Web Token (JWT), Stripe, Nodemailer
- **Database**: MongoDB Atlas
- **Environment**: dotenv for configuration

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Stripe account (for API keys)
- Gmail account (for email notifications)

### Clone the Repository
```bash
git clone https://github.com/your-username/quickshop.git
cd quickshop
```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory:
   ```env
    MONGODB_URI=<your mongodb database url>
    STRIPE_SECRET_KEY=<your stripe secret key>
    JWT_SECRET=<your jwt secret>
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=587
    SMTP_USER=<your gmail address>
    SMTP_PASS=<your gmail app password>
    PORT=5000
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   Verify `MongoDB connected` and `Server running on port 5000`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` directory:
   ```env
   VITE_BASE_URL=http://localhost:5000
   VITE_STRIPE_PUBLISHABLE_KEY=<your stripe publishable key>
   ```
4. Start the frontend server:
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173` (default Vite port).

## Usage

1. **Register/Login**:
   - Go to `http://localhost:5173/register` to create an account (e.g., `test@example.com`, password: `123456`).
   - Log in at `http://localhost:5173/login`.
2. **Browse Products**:
   - Visit `http://localhost:5173/products` to view products from the Fake Store API.
   - Use "Next"/"Previous" buttons to navigate pages.
   - Click "Add to Cart" to add products.
3. **Manage Cart**:
   - Go to `http://localhost:5173/cart`.
   - Adjust quantities, remove items, or clear the cart.
   - Click "Proceed to Checkout".
4. **Checkout**:
   - At `http://localhost:5173/checkout`, enter an email and use Stripe test card `4242 4242 4242 4242` (any future date, any CVC).
   - Verify payment success and redirection to `/success`.
5. **Logout**:
   - Click "Logout" in the Navbar to return to `/login`.

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Log in and receive a JWT token
- `GET /api` - Get logged-in user info

### Cart
- `GET /api/cart` - Get user’s cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update item quantity
- `DELETE /api/cart/remove/:productId` - Remove item from cart
- `DELETE /api/cart/remove/all` - Clear cart

### Payment
- `POST /api/payment/create-payment-intent` - Create Stripe payment intent

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make changes and commit (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Deployment Lnk

- `Frontend` - 
- `Backend` - 
## Contact

For issues or feature requests, open an issue on GitHub or contact [your-email@example.com](mailto:your-email@example.com).