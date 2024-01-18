
import './App.css';
import Signup from './pages/signUp';
import Login from './pages/login';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/home';
import Cart from './pages/cart';
import ProductPage from './pages/selectedProduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/cart/:userId" element={<Cart />}></Route>
        <Route path="/product/:id" element={<ProductPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
