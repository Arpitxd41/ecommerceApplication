import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductFilter = ({ onCategoryChange, onSortingTypeChange, onSortingChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortingType, setSortingType] = useState('none');
  const [sortingOrder, setSortingOrder] = useState('default');
  const [orderDropdownActive, setOrderDropdownActive] = useState(false);
  const DUMMY_CATEGORY = process.env.REACT_APP_PRODUCT_CATEGORIES;
  
  useEffect(() => {
    // Fetch categories from the API
    axios.get(DUMMY_CATEGORY)
      .then(response => setCategories(response.data))
      .catch(error => console.error(error));
  }, [DUMMY_CATEGORY]);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  const handleSortingTypeChange = (type) => {
    setSortingType(type);
    onSortingTypeChange(type);
    
    if (type === 'none') {
      setSortingOrder('default');
      setOrderDropdownActive(false);
    } else {
      setOrderDropdownActive(true);
    }
  };

  const handleSortingChange = (order) => {
    setSortingOrder(order);
    onSortingChange(order);
  };

  return (
    <div className='bg-black flex flex-col md:flex-row px-2 lg:px-8 h-fit rounded-sm w-full justify-evenly'>
      <div className='lg:w-1/12 items-center justify-start hidden lg:flex'>
        <i className="fa fa-sliders text-3xl font-semibold" aria-hidden="true"></i>
      </div>
      <div className='flex flex-col md:flex-row justify-center md:justify-evenly w-full lg:w-11/12 py-5' >
        {/* Category Selection */}
        <div className='relative w-full md:w-1/3'>
          <label htmlFor="category" className='md:font-semibold'>
            <select
              id="category"
              onChange={handleCategoryChange}
              value={selectedCategory}
              className='appearance-none rounded-sm bg-black border-x-0 border-t-0 text-white mx-1 w-full'>
              <option className='' value="">Category:</option>
              {categories.map((category, index) => (
                <option
                  className=''
                  key={category.slug} // Use index as key
                  value={category.slug} // Assuming the category is a string
                >
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Sorting Type */}
        <div className='relative w-full md:w-1/3'>
          <label htmlFor='sortbyDropdown' className='md:font-semibold'>
            <select
              id='sortbyDropdown'
              onChange={(e) => handleSortingTypeChange(e.target.value)}
              className='appearance-none rounded-sm bg-black border-x-0 border-t-0 text-white mx-1 w-full' >
              <option value="none">Sort by:</option>
              <option value="rating">By Rating</option>
              <option value="price">By Price</option>
            </select>
          </label>
        </div>

        {/* Order dropdown */}
        {orderDropdownActive && ( 
          <div className='relative w-full md:w-1/3'>
            <label htmlFor='orderDropdown' className='md:font-semibold'>
              <select
                id='orderDropdown'
                onChange={(e) => handleSortingChange(e.target.value)}
                className='appearance-none rounded-sm bg-black border-x-0 border-t-0 text-white mx-1 w-full' >
                <option value="default">Sorting Order:</option>
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
