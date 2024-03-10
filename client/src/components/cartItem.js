import React, { useState, useEffect } from 'react';
import CounterButtons from '../utils/counterButtons';

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
      <li className='px-8 bg-gradient-to-r from-fuchsia-500 to-black'>
        {loading ? (
          <p>Loading product...</p>
        ) : product ? (
          <div className='w-full flex flex-row h-40 items-center justify-between'>
            <div className='w-2/5 rounded-xl px-2 py-2 bg-white flex flex-row h-36 justify-between space-x-2'>
              <div className='items-center py-4 px-8 w-3/4 rounded-s-lg overflow-y-hidden'>
                <h3 className='text-2xl font-bold'>{product.title}</h3>
                <p className='text-red-500 font-bold'>{product.discountPercentage} % OFF</p>
                <p className=''>only {product.stock} left in cart</p>
                <p className=''>${product.price}</p>
              </div>
              <img className='w-32 object-cover bg-white rounded-full' src={product.thumbnail} alt={product.title} />
            </div>
            <div className='text-2xl font-bold text-gray-200 flex flex-row'>
              <i className="fa fa-tag mr-2 text-yellow-500 mt-2" aria-hidden="true"></i>
              <p>Price: ${product.price}</p>
            </div>
            <CounterButtons productNumber={productNumber} userId={userId} handleCheckboxChange={handleLocalCheckboxChange} />
          </div>
        ) : (
          <p>Error fetching product.</p>
        )}
        <hr className='border-white'/>
      </li>
    </div>
  );
};

export default CartItem;
