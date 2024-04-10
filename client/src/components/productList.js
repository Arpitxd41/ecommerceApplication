import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './productCard';
import ProductFilter from './productFilter';

const ProductList = ({ userDetails }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortingOrder, setSortingOrder] = useState('default');
  const [sortingType, setSortingType] = useState('none');
  const [matchedProducts, setMatchedProducts] = useState([]);
  const dummyProducts = process.env.REACT_APP_PRODUCTS;
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${dummyProducts}/${selectedCategory ? `/category/${selectedCategory}` : ''}`);
        const { products } = response.data;
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
      }
    };

    fetchProducts();
  }, [selectedCategory, sortingOrder, sortingType, dummyProducts]);

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
      <div className="grid grid-cols-2 gap-1 bg-gray-300 drop-shadow-2xl rounded-sm shadow-inner shadow-black my-10 mx-0 items-center align-middle 
      lg:grid-cols-4 lg:gap-8 lg:w-11/12 lg:float-left lg:mx-14 lg:py-12 lg:px-2
      md:grid-cols-3 md:gap-4 md:mx-8 md:p-6">
        {matchedProducts.map(product => (
          <ProductCard key={product.id} product={product} userDetails={userDetails} />
        ))}
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
