import React, { useState, useEffect } from 'react';
import CounterButtons from '../utils/cartButtons';

const CartItem = ({ productNumber, userId, cartProducts, setCartProducts }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${productNumber}`);
        if (response.ok) {
          const productData = await response.json();
          setProduct(productData);
        } else {
          console.error(`Failed to fetch product with productNumber ${productNumber}`);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productNumber]);

  const handleLocalCheckboxChange = (checked) => {
    setIsChecked(checked);
  };

  return (
    <div>
      <li className='bg-gradient-to-r from-cyan-500 to-black p-5 md:px-5
      lg:px-8'>
        {loading ? (
          <p>Loading product...</p>
        ) : product ? (
          <div className='w-full flex flex-col md:flex-row md:h-40 items-center justify-between md:space-y-0 space-y-4'>
            <div className='w-4/5 md:w-2/5 rounded-xl px-2 py-2 bg-white drop-shadow-2xl shadow-inner shadow-black flex flex-row h-36 justify-between space-x-1'>
              <div className='w-3/4 items-center py-4 px-4 rounded-s-lg overflow-y-hidden'>
                <h3 className='h-8 overflow-y-hidden text-lg lg:text-2xl font-bold'>{product.title}</h3>
                <p className='text-red-500 font-bold'>{product.discountPercentage} % OFF</p>
                <p className=''>only {product.stock} left in cart</p>
                <p className=''>₹ {product.price}</p>
              </div>
              <img className='lg:w-32 w-28 object-cover bg-white' src={product.thumbnail} alt={product.title} />
            </div>
            <div className='text-xl lg:text-2xl font-bold text-white flex flex-row'>
              <i className="fa fa-tag mr-2 text-yellow-400 mt-2" aria-hidden="true"></i>
              <p>Price: ₹ {product.price}</p>
            </div>
            <CounterButtons productNumber={productNumber} userId={userId} handleCheckboxChange={handleLocalCheckboxChange} />
          </div>
        ) : (
          <p>Error fetching product.</p>
        )}
        <hr className='border-white md:mt-1 mt-4'/>
      </li>
    </div>
  );
};

export default CartItem;
