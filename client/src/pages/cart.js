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

        <div className='bg-gray-200 overflow-y-scroll'>
        {loading ? (
          <p>Loading...</p>
        ) : (
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
        )}
        </div>
        <div className='p-2 object-contain h-fit bg-slate-900'>
          <hr className='border-gray-950 my-12 relative z-40'/>
          <div className='footer w-full text-center flex justify-center h-40 relative z-20'>
            <div className="">
                <p className="object-contain h-12 items-center align-middle rounded-full px-8 py-2 bg-black shadow-xl shadow-black text-slate-300">
                 <a href="{somelink}" className="hover:underline mb-2"> Made with <i className="fa fa-heart animate-characters h-12 text-lg"></i> by Arpit</a>
                </p>
            </div>
          </div>
        </div>

      </div>

      <div className='sticky bottom-0 left-0 right-0 z-50'>
        <StickyFooter cartProducts={cartProducts} setCartProducts={setCartProducts} userDetails={userDetails} />
      </div>
      
    </div>
  );
};

export default Cart;
