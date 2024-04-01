import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateToken } from '../utils/filter';
import CartItem from '../components/cartItem';
import NavbarOne from '../components/navbarOne';
import StickyFooter from '../components/cartFooter';
import Footer from '../data/user/standardFooter';
import emptyCart from '../images/emptyCart.png';

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
        console.error('User cart empty', response);
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
        return [...prevState, productNumber];
      } else {
        return prevState.filter(item => item !== productNumber);
      }
    });
  };

  return (
    <div className='h-screen'>

      <div className=''>

        <div className='flex justify-center'>
          <NavbarOne />
        </div>

        <div className='flex flex-row h-16 md:h-12 px-8 text-center bg-black text-md text-gray-100 justify-between shadow-md shadow-black'>
          <h2 className='text-md font-semibold py-2'>{cartProducts.length ? `Hurry ${userDetails.firstName}! Checkout your products now before they're gone..` : 'No product added to cart, Grab the products before they are gone'}</h2>          
        </div>

        <div className='bg-gray-100 overflow-y-scroll'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {cartProducts.length ? (
              <ul className=''>
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
            ) : (
              <div className="flex justify-center items-center h-full bg-transparent flex-col md:py-16 space-y-6">
                <h2 className='text-2xl font-bold'>Empty Cart</h2>
                <div className='bg-yellow-500 rounded-full p-8'>
                  <img src={emptyCart} alt="Empty Cart" className="w-40 h-40" />
                </div>
              </div>
            )}
          </>
        )}
        </div>
        <Footer />

      </div>

      <div className='sticky bottom-0 left-0 right-0 z-50'>
        <StickyFooter cartProducts={cartProducts} setCartProducts={setCartProducts} userDetails={userDetails} />
      </div>
      
    </div>
  );
};

export default Cart;
