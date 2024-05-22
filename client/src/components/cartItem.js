import React, { useState, useEffect } from 'react';
import CounterButtons from '../components/cartButtons';
import axios from 'axios';

const CartItem = ({ productId, userId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  
  useEffect(() => {
    const fetchProductDetails = async () => {
      const SERVER = process.env.REACT_APP_DEVELOPMENT_SERVER;
      // const SERVER = process.env.REACT_APP_PRODUCTION_SERVER;
      try {
        const response = await axios.get(`${SERVER}/product/${productId}`);
        const result = response.data.product;
        setProduct(result);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

  const handleLocalCheckboxChange = (checked) => {
    setIsChecked(checked);
  };

  return (
    <div className=''>
      <li className='bg-gradient-to-r from-cyan-500 to-black px-5 py-2 md:px-5
      lg:px-8 border-t'>
        {loading ? (
          <p>Loading product...</p>
        ) : product ? (
          <div className='w-full flex flex-col md:flex-row md:h-40 items-center justify-between md:space-y-0 space-y-4'>
            <div className='w-4/5 md:w-3/5 lg:w-1/2 rounded-xl px-2 py-2 bg-white drop-shadow-2xl shadow-inner shadow-black flex flex-row h-36 justify-between space-x-1'>
              <div className='w-full lg:w-3/4 items-center py-4 px-4 rounded-s-lg overflow-y-hidden'>
                <h3 className='h-8 overflow-y-hidden text-lg lg:text-2xl font-bold'>{product.title}</h3>
                <p className='text-red-500 font-bold'>{product.discountPercentage} % OFF</p>
                <p className='text-2xl font-thin'><i className="fa fa-tag mr-2 text-yellow-500 mt-2" aria-hidden="true"></i>₹{product.price}</p>
              </div>
              <img className='lg:w-1/2 w-28 object-cover bg-white' src={product.images[0]} alt={product.title} />
            </div>
            <CounterButtons productId={productId} userId={userId} handleCheckboxChange={handleLocalCheckboxChange} />
          </div>
        ) : (
          <p>Error fetching product.</p>
        )}
      </li>
    </div>
  );
};

export default CartItem;
