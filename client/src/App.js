
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './pages/signUp';
import Login from './pages/login';
import HomePage from './pages/home';
import Cart from './pages/cart';
import Checkout from './pages/checkOut';
import Paysecure from './pages/paySecure'
import ProductPage from './pages/selectedProduct';
import { AuthProvider } from './context/authContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/register" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/cart/:userId" element={<Cart />}></Route>
          <Route path="/checkout/:userId" element={<Checkout />}></Route>
          <Route path="/paysecure/:userId" element={<Paysecure />}></Route>
          <Route path="/product/:productNumber" element={<ProductPage />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
