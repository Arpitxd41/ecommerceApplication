import React, { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { validateToken } from '../utils/filter';

const Cart = () => {
  const [userDetails, setUserDetails] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (!authToken) {
      navigate('/login');
      return;
    }
    console.log(userDetails.firstName);
    setUserDetails(userDetails);

    const cartProducts = [];
    setCartProducts(cartProducts);

    fetchUserCart(userDetails._id, authToken);
    
    const isTokenValid = validateToken(authToken);
    if (!isTokenValid) {
      navigate('/login');
    }
  }, [navigate]);

  const fetchUserCart = async (userId, authToken) => {
    try {
      const response = await fetch(`/cart/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      if (response.ok) {
        const cartData = await response.json();
        setCartProducts(cartData.cartItems);
      } else {
        console.error('Failed to fetch User cart l.no.42');
      }
    } catch (error) {
      console.error('Error fetching user data :', error);
    }
  };
  return (
    <div className='border border-black'>
      <div className=''>
        <h2>{userDetails.firstName}'s Product List</h2>
        <ul>
          {cartProducts.map((item) => (
            <li key={item.product._id}>{item.product.name} - Quantity: {item.quantity}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Cart;