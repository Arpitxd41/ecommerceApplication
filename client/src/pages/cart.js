import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateToken } from '../utils/filter';
import CartItem from '../components/cartItem';
import NavbarOne from '../components/navbarOne';
import StickyFooter from '../components/cartFooter';

const Cart = () => {
  const [userDetails, setUserDetails] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
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
        setLoading(false);
      } else {
        console.error('Failed to fetch User cart:', response);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  const handleCheckboxChange = (productNumber, checked) => {
    setSelectedProducts(prevState => {
      if (checked) {
        console.log('selected products :', selectedProducts);
        return [...prevState, productNumber];
      } else {
        return prevState.filter(item => item !== productNumber);
      }
    });
  };

  return (
    <div className='border border-black'>
      <div className=''>
        <div className='flex justify-center'>
          <NavbarOne />
        </div>
        <div className='flex flex-row h-12 px-8 text-center bg-yellow-400 justify-between shadow-md shadow-black'>
          <h2 className='text-xl font-semibold py-2'>Hurry {userDetails.firstName} ! Checkout your products now before they're gone..</h2>
          <p className='text-md font-semibold py-2'>PROFILE ID : {userDetails._id}</p>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {cartProducts.map((item) => (
              <CartItem
                key={item.productNumber}
                productNumber={item.productNumber}
                userId={userDetails._id}
                isChecked={selectedProducts.includes(item.productNumber)}
                handleCheckboxChange={handleCheckboxChange}
              />
            ))}
          </ul>
        )}
      </div>
      <StickyFooter cartProducts={cartProducts} setCartProducts={setCartProducts} userDetails={userDetails} />
    </div>
  );
};

export default Cart;
