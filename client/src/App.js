
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './pages/signUp.js';
import Login from './pages/login.js';
import HomePage from './pages/home.js';
import Cart from './pages/cart.js';
import Orders from './pages/orders.js'
import Checkout from './pages/checkOut.js';
import ProductPage from './pages/selectedProduct.js';
import { AuthProvider } from './context/authContext.js';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/register" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/cart/:userId" element={<Cart />}></Route>
          <Route path="/orders/:userId" element={<Orders />}></Route>
          <Route path="/checkout/:userId" element={<Checkout />}></Route>
          <Route path="/product/:productNumber" element={<ProductPage />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
