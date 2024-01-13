import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductFilter = ({ onCategoryChange, onSortingTypeChange, onSortingChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // Fetch categories from the API
    axios.get('https://dummyjson.com/products/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onCategoryChange(category);
  };
  
  const handleSortingTypeChange = (type) => {
    onSortingTypeChange(type);
  };

  const handleSortingChange = (order) => {
    onSortingChange(order);
  };

  return (
    <div className='bg-gradient-to-b from-pink-600 to-violet-900 flex flex-col space-y-2 py-2 h-fit rounded-sm px-2 w-80
    md:w-11/12 lg:py-16 lg:px-3 lg:justify-evenly'>
      <div className='hidden text-center border-2 bg-black border-black rounded-md
       lg:px-10 lg:block'>
        <h2 className='animate-characters rounded-full w-fit px-8 text-lg font-semibold md:text-3xl
         lg:py-2'>FILTER</h2>
      </div>

      <div className='flex flex-col justify-evenly py-5 object-contain space-y-10
      lg:space-y-12 lg:flex-col md:space-y-2 md:flex-row'>

        {/* Category Selection */}      
        <div className='-ml-0 md:-ml-52 lg:ml-0 mt-2'>
          <label htmlFor="category" className='md:font-semibold'>Category:
            <select
              id="category"
              onChange={handleCategoryChange}
              value={selectedCategory}
              className='rounded-md bg-black border-black text-white w-72 mx-1
              md:w-60 lg:w-64'>
              <option value="">All</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Sorting Type */}
        <div className=''>
          <label htmlFor='sortbyDropdown' className='md:font-semibold mb-2'>Sort:
            <select
              id='sortbyDropdown'
              onChange={(e) => handleSortingTypeChange(e.target.value)}
              className='rounded-md bg-black border-black text-white w-72 mx-1
              md:w-60 lg:w-64' >
              <option value="none">None</option>
              <option value="rating">By Rating</option>
              <option value="price">By Price</option>
            </select>
          </label>
        </div>

        {/* Order dropdown */}
        <div className=''>
          <label htmlFor='orderDropdown' className='md:font-semibold mb-2'>Order:
            <select
              id='orderDropdown'
              onChange={(e) => handleSortingChange(e.target.value)}
              className='rounded-md bg-black border-black text-white w-72 mx-1
              md:w-60 lg:w-64' >
              <option value="default">Default</option>
              <option value="descending">High to Low</option>
              <option value="ascending">Low to High</option>
            </select>
          </label>
        </div>

      </div>

    </div>
  );
};

export default ProductFilter;
