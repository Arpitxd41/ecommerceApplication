import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateToken } from '../utils/filter';
import CartItem from '../components/cartItem';

const Cart = () => {
  const [userDetails, setUserDetails] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const storedUserDetails = localStorage.getItem('userDetails');

    if (!authToken) {
      navigate('/login');
      return;
    }

    if (!storedUserDetails) {
      console.error('User details not found in localStorage.');
      return;
    }

    const userDetails = JSON.parse(storedUserDetails);
    setUserDetails(userDetails);

    fetchUserCart(userDetails._id, authToken);
    
    const isTokenValid = validateToken(authToken);
    if (!isTokenValid) {
      navigate('/login');
    }
  }, [navigate]);

  const fetchUserCart = async (userId, authToken) => {
    try {
      const response = await fetch(`https://localhost:5000/user/${userId}/cart`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      if (response.ok) {
        const cartData = await response.json();
        setCartProducts(cartData.cartItems);
        setLoading(false); // Set loading to false after fetching cart items
      } else {
        console.error('Failed to fetch User cart:', response);
        setLoading(false); // Set loading to false if fetching cart items failed
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false); // Set loading to false if an error occurs
    }
  };

  return (
    <div className='border border-black'>
      <div className=''>
        <h2>{userDetails.firstName}'s Product List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {cartProducts.map((item) => (
              <CartItem key={item.productNumber} productNumber={item.productNumber} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;
