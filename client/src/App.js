
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './pages/signUp.js';
import Login from './pages/login.js';
import HomePage from './pages/home/home.js';
import Cart from './pages/stack/cart.js';
import Orders from './pages/stack/orders.js'
import Profile from './pages/private/profile.js'
import Checkout from './pages/stack/checkOut.js';
import AdminDashboard from './pages/home/adminDashboard.js';
import ProductPage from './pages/stack/selectedProduct.js';
import ErrorPage from './pages/error/fail.js';
import { AuthProvider } from './context/authContext.js';
import ErrorBoundaryWrapper from './data/error/errorWrapper.js';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundaryWrapper>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/broken" element={<ErrorPage />}></Route>
            <Route path="*" element={<ErrorPage />}></Route>
            <Route path="/register" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/cart/:userId" element={<Cart />}></Route>
            <Route path="/orders/:userId" element={<Orders />}></Route>
            <Route path="/profile/:userId" element={<Profile />}></Route>
            <Route path="/checkout/:userId" element={<Checkout />}></Route>
            <Route path="/dashboard/:adminId" element={<AdminDashboard />}></Route>
            <Route path="/product/:productId" element={<ProductPage />}></Route>
          </Routes>
        </ErrorBoundaryWrapper>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
