import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './productCard';
import ProductFilter from './productFilter';

const ProductList = ({ userDetails }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortingOrder, setSortingOrder] = useState('default');
  const [sortingType, setSortingType] = useState('none');
  const [matchedProducts, setMatchedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products${selectedCategory ? `/category/${selectedCategory}` : ''}`);
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
  }, [selectedCategory, sortingOrder, sortingType]);

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
    <div className="w-full flex flex-col-reverse bg-gradient-to-r from-violet-600 via-cyan-500 to-fuchsia-500 relative z-20 rounded-sm justify-center shadow-inner-black">
      <div className="float-none mx-14 grid grid-cols-2 gap-1 my-10 bg-gray-300 p-10 drop-shadow-2xl rounded-sm shadow-inner shadow-black border 
      lg:gap-6 lg:w-11/12 lg:float-left 
      md:grid-cols-4">
        {matchedProducts.map(product => (
          <ProductCard key={product.id} product={product} userDetails={userDetails} />
        ))}
      </div>
      <div className='flex justify-center float-none text-center align-top '>
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
