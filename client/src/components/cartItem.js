import React, { useState, useEffect } from 'react';
import CartButtons from '../utils/checkOut';

const CartItem = ({ productNumber }) => {
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
      <li className='flex border-t'>
            {loading ? (
                  <p>Loading product...</p>
                  ) : (
                  <div className='w-full flex flex-row h-40 items-center justify-between'>
                        <div className='w-3/5 px-2 py-2'>
                              <h3 className='text-2xl font-bold'>{product.title}</h3>
                              <p>Price: ${product.price}</p>
                              <p>Units remaining: {product.stock}</p>
                              <p>Discount Percentage: {product.discountPercentage}%</p>
                        </div>
                        <CartButtons />
                        <img className='w-40 object-contain h-40' src={product.thumbnail} alt={product.title} />
                  </div>
            )}
            <hr className='border-2'/>
      </li>
);
};

export default CartItem;