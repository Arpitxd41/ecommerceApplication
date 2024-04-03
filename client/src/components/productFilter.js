import React, { useState, useEffect } from 'react';
import axios from 'axios';
import filterIcon from '../images/icons/filter.png';

const ProductFilter = ({ onCategoryChange, onSortingTypeChange, onSortingChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortingType, setSortingType] = useState('none');
  const [sortingOrder, setSortingOrder] = useState('default');
  const [orderDropdownActive, setOrderDropdownActive] = useState(false);

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
    console.log(sortingType);
    setSortingType(type);
    onSortingTypeChange(type);
    
    // If sorting type changes from 'none', reset sorting order to 'default'
    if (type === 'none') {
      setSortingOrder('default');
      setOrderDropdownActive(false);
    } else {
      console.log(sortingOrder)
      setOrderDropdownActive(true);
    }
  };

  const handleSortingChange = (order) => {
    setSortingOrder(order);
    onSortingChange(order);
  };

  return (
    <div className='bg-black flex flex-col md:flex-row px-2 md:px-12 h-fit rounded-sm w-full justify-evenly'>
      <div className='w-1/5 items-center justify-start hidden md:flex'>
        <img src={filterIcon} className='h-12' alt='filter-icon'/>
      </div>
      <div className='flex flex-col md:flex-row justify-center md:justify-evenly w-full md:w-4/5 py-5' >
        {/* Category Selection */}
        <div className='relative'>
          <label htmlFor="category" className='md:font-semibold'>
            <select
              id="category"
              onChange={handleCategoryChange}
              value={selectedCategory}
              className='appearance-none rounded-sm bg-black border-x-0 border-t-0 text-white mx-1 md:w-56 w-full'>
              <option className='' value="">Category:</option>
              {categories.map(category => (
                <option className='' key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Sorting Type */}
        <div className='relative'>
          <label htmlFor='sortbyDropdown' className='md:font-semibold'>
            <select
              id='sortbyDropdown'
              onChange={(e) => handleSortingTypeChange(e.target.value)}
              className='appearance-none rounded-sm bg-black border-x-0 border-t-0 text-white mx-1 md:w-56 w-full' >
              <option value="none">Sort by:</option>
              <option value="rating">By Rating</option>
              <option value="price">By Price</option>
            </select>
          </label>
        </div>

        {/* Order dropdown */}
        {orderDropdownActive && ( 
          <div className='relative'>
            <label htmlFor='orderDropdown' className='md:font-semibold'>
              <select
                id='orderDropdown'
                onChange={(e) => handleSortingChange(e.target.value)}
                className='appearance-none rounded-sm bg-black border-x-0 border-t-0 text-white mx-1 md:w-56 w-full' >
                <option value="default">Order:</option>
                <option value="descending">High to Low</option>
                <option value="ascending">Low to High</option>
              </select>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilter;
