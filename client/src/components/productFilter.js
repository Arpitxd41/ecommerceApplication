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
    <div className='bg-gradient-to-b from-pink-600 to-violet-900 w-full item-center flex flex-row lg:flex-col space-y-12 justify-evenly lg:justify-center py-20 px-9 h-fit rounded-sm'>
      
{/* Category Selection */}
      <div className='flex flex-col rounded-md items-center'>
        <label htmlFor="category" className='font-semibold'>Category:
          <select id="category" onChange={handleCategoryChange} value={selectedCategory} className='w-40 lg:w-64 rounded-md bg-stone-950 border-stone-950 text-white'>
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
      <div className='flex flex-col rounded-lg items-center'>
        <label htmlFor='sortbyDropdown' className='font-semibold mb-2'>Sort:
          <select id='sortbyDropdown' onChange={(e) => handleSortingTypeChange(e.target.value)} className='w-40 lg:w-64 rounded-md bg-stone-950 border-stone-950 text-white' >
            <option value="none">None</option>
            <option value="rating">By Rating</option>
            <option value="price">By Price</option>
          </select>
        </label>
      </div>

{/* Order dropdown */}
      <div className='flex flex-col rounded-lg items-center'>
        <label htmlFor='orderDropdown' className='font-semibold mb-2'>Order:
          <select id='orderDropdown' onChange={(e) => handleSortingChange(e.target.value)} className='w-40 lg:w-64 rounded-md bg-stone-950 border-stone-950 text-white' >
            <option value="default">Default</option>
            <option value="descending">High to Low</option>
            <option value="ascending">Low to High</option>
          </select>
        </label>
      </div>


    </div>
  );
};

export default ProductFilter;
