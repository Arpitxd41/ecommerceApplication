import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './productCard';
import ProductFilter from './productFilter';

const ProductList = ({ userDetails }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortingOrder, setSortingOrder] = useState('default');
  const [sortingType, setSortingType] = useState('none');
  const [matchedProducts, setMatchedProducts] = useState([]);
  const DEVELOPMENT_SERVER = process.env.REACT_APP_DEVELOPMENT_SERVER;
  // const PRODUCTION_SERVER = process.env.REACT_APP_PRODUCTION_SERVER;
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // await axios.get(`${DEVELOPMENT_SERVER}/fetch_all_products`);
        const response = await axios.get(`${DEVELOPMENT_SERVER}/${selectedCategory ? `all_products/${selectedCategory}` : 'all_products'}`);
        
        const data = response.data;
        const products = data.products;

        if (!products) {
          setMatchedProducts([]);
          return;
        }

        if (sortingType === 'none') {
          setMatchedProducts(products);
        } else {
          const sortedProducts = products.slice().sort((a, b) => {
            const valueA = sortingType === 'rating' ? a.rating : a.price;
            const valueB = sortingType === 'rating' ? b.rating : b.price;
            return sortingOrder === 'ascending' ? valueA - valueB : valueB - valueA;
          });
          setMatchedProducts(sortedProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setMatchedProducts([]);
      }
    };

    fetchProducts();
  }, [selectedCategory, sortingOrder, sortingType, DEVELOPMENT_SERVER]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortingChange = (order) => {
    setSortingOrder(order);
  };

  const handleSortingTypeChange = (type) => {
    setSortingType(type);
  };

  return (
    <div className="w-full flex flex-col-reverse bg-gradient-to-r from-pink-800 to-fuchsia-800 relative z-20 rounded-sm justify-center shadow-inner-black">

      {/* PRODUCT LIST */}
      <div className="grid grid-cols-2 gap-0 bg-gray-300 drop-shadow-2xl rounded-sm shadow-inner shadow-black my-10 mx-0 items-center align-middle 
      lg:grid-cols-4 lg:gap-2 lg:w-11/12 lg:float-left lg:mx-16 lg:py-12 lg:px-8
      md:grid-cols-3 md:gap-0 md:mx-0 md:p-0">
        {matchedProducts && matchedProducts.length > 0 ? (
          matchedProducts.map((product) => (
            <ProductCard product={product} userDetails={userDetails} />
          ))
        ) : (
          <p className='text-xl text-center rounded-full px-8 mx-2 py-2 text-white bg-black font-bold my-12'> ~ Loading....</p>
        )}
      </div>

      {/* PRODUCT FILTER */}
      <div className='flex justify-center text-center align-top '>
        <ProductFilter 
          onCategoryChange={handleCategoryChange}
          onSortingTypeChange={handleSortingTypeChange}
          onSortingChange={handleSortingChange}
        />
      </div>
    </div>
  );
}

export default ProductList;
