import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import CartItem from '../../components/cartItem';
import NavbarOne from '../../components/navbarOne';
import StickyFooter from '../../components/cartFooter';
import Footer from '../../data/user/standardFooter';
import shoppers from "../../images/shopperbg.png";
import { handleCheckboxChange } from '../../utils/checkboxChanges';
import { validateToken } from '../../utils/filter';

const Cart = () => {
  const [userDetails, setUserDetails] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = Cookies.get('authToken');
    const storedUserDetails = JSON.parse(Cookies.get('userDetails'));
    setUserDetails(storedUserDetails);
    
    if (!authToken) {
      navigate('/login');
      return;
    }
    if (!storedUserDetails) {
      console.error('User details not found in localStorage.');
      return;
    }

    const userId = storedUserDetails._id;
    
    const fetchUserCart = async () => {
      // const SERVER = process.env.REACT_APP_DEVELOPMENT_SERVER;
      const SERVER = process.env.REACT_APP_PRODUCTION_SERVER;
      try {
        const response = await axios.get(`${SERVER}/user/cart/${userId}`);

        const cartData = response.data;
        setCartProducts(cartData.cartItems);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (validateToken(authToken)) {
      fetchUserCart();
    } else {
      navigate('/login');
    }


  }, [navigate]);

  const handleCheckboxChangeWrapper = (productId, checked) => {
    handleCheckboxChange(productId, checked, selectedProducts, setSelectedProducts);
  };

  return (
    <div className='h-screen'>
      <div className='bg-cover bg-center bg-fixed lg:bg-contain bg-no-repeat' style={{ backgroundImage: `url(${shoppers})` }}>
        <div className='flex justify-center'>
          <NavbarOne />
        </div>

        <div className='flex flex-row h-16 md:h-12 px-8 text-center bg-slate-700 text-md text-gray-100 justify-between shadow-sm shadow-black'>
          <h2 className='text-md font-semibold py-2'>
            {cartProducts.length ? `Hurry ${userDetails.firstName}! Checkout your products now before they're gone..` : 'No product added to cart, Grab the products before they are gone'}
          </h2>
        </div>

        <div className='overflow-y-scroll'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {cartProducts.length ? (
                <ul className='h-screen space-y-2'>
                  {cartProducts.map((item) => (
                    <CartItem
                      key={item.productId}
                      productId={item.productId}
                      userId={userDetails._id}
                      isChecked={selectedProducts.includes(item.productId)}
                      handleCheckboxChange={handleCheckboxChangeWrapper}
                    />
                  ))}
                </ul>
              ) : (
                <div className="flex justify-center items-center h-screen bg-transparent flex-col">
                  <p>Your cart is empty. Start adding items!</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
      <div className='sticky bottom-0 left-0 right-0 z-50'>
        <StickyFooter cartProducts={cartProducts} setCartProducts={setCartProducts} userDetails={userDetails} />
      </div>
    </div>
  );
};

export default Cart;
