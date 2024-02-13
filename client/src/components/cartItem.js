import React, { useState, useEffect } from 'react';
import CounterButtons from '../utils/counterButtons';

const CartItem = ({ productNumber, userId }) => {
const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);

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



return (
      <li className='px-8 bg-gradient-to-r from-fuchsia-500 to-black'>
            {loading ? (
                  <p>Loading product...</p>
                  ) : (
                  <div className='w-full flex flex-row h-40 items-center justify-between'>
                        <div className='w-2/5 rounded-xl px-2 py-2 bg-white flex flex-row h-36'>
                              <div className='items-center py-4 px-8'>
                                    <h3 className='text-2xl font-bold'>{product.title}</h3>
                                    <p className='text-red-500 font-bold'>{product.discountPercentage} % OFF</p>
                                    <p className=''>only {product.stock} left in cart</p>
                              </div>
                              <img className='w-40 object-contain' src={product.thumbnail} alt={product.title} />
                        </div>
                        <div className='text-2xl font-bold text-gray-200 flex flex-row'>
                              <i className="fa fa-tag mr-2 text-yellow-500 mt-2" aria-hidden="true"></i>
                              <p>Price: ${product.price}</p>
                        </div>
                        <CounterButtons productNumber={productNumber} userId={userId} />
                  </div>
            )}
            <hr className='border-white'/>
      </li>
);
};

export default CartItem;