import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderedBundle = ({ order }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      // const SERVER = process.env.REACT_APP_DEVELOPMENT_SERVER;
      const SERVER = process.env.REACT_APP_PRODUCTION_SERVER;
      
      try {
        setLoading(true);
        const promises = order.selectedProducts.map(async (product) => {
          
          const response = await axios.get(`${SERVER}/product/${product.productId}`);
          const ordered = response.data.product;
          if (response) {
            const order = { ...ordered, quantity: product.quantity };
            return order;
          }
          throw new Error('Failed to fetch product details');
        });
        const productsData = await Promise.all(promises);
        
        setProducts(productsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    
    fetchProducts();
  }, [order.selectedProducts]);

  return (
    <div className='w-full overflow-x-auto flex flex-nowrap object-contain h-32'>
      <div className='flex items-center justify-center h-30'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='flex space-x-2 object-contain items-center'>
          {products.map((product, index) => (
            <div key={index} className='flex flex-row mr-4 border-x h-30 py-2 items-center
            shadow-md shadow-black space-x-2'>
                  <div className='w-24 p-1'>
                        <img src={product.images[0]} alt={product.title} className='w-20 h-20 object-cover border-black' />
                  </div>
                  <div className='font-semibold w-44'>
                        <p className='overflow-x-hidden'>{product.title}</p>
                        <p className='font-thin text-xl'> ₹ {product.price}</p>
                        <p className=''>Quantity: {product.quantity}</p>
                  </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default OrderedBundle;
