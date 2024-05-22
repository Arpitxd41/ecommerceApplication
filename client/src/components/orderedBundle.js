import React, { useState, useEffect } from 'react';

const OrderedBundle = ({ order }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const DUMMY_PRODUCTS = process.env.REACT_APP_PRODUCTS;
      try {
        setLoading(true);
        const promises = order.selectedProducts.map(async (product) => {
          const response = await fetch(`${DUMMY_PRODUCTS}/${product.productNumber}`);
          if (response.ok) {
            const productDetails = await response.json();
            return { ...productDetails, quantity: product.quantity };
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
        <div className='flex space-x-2 rounded-full object-contain items-center'>
          {products.map((product, index) => (
            <div key={index} className='flex flex-row mr-4 border-x h-30 py-2 items-center
            hover:shadow-md space-x-2'>
                  <div className='w-24 p-1'>
                        <img src={product.thumbnail} alt={product.title} className='w-20 h-20 object-cover border-black' />
                  </div>
                  <div className='font-semibold w-44'>
                        <p className='overflow-x-hidden'>{product.title}</p>
                        <p className=''> $ {product.price}</p>
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
