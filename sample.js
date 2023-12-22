import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './productCard'; // Import unified ProductCard component

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({
    category: '',
    minRating: '',
    maxPrice: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the first API
        const response1 = await axios.get('https://fakestoreapi.com/products');

        // Fetch data from the second API
        const response2 = await axios.get('https://dummyjson.com/products');

        // Merge data from both APIs into a single array
        const combinedProducts = [...response1.data, ...response2.data.products];

        // Set the combined products in the state
        setProducts(combinedProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleFilterSubmit = () => {
    // Optionally, you can add additional validation before applying filters
    // Apply filters based on user input
    const filteredProducts = products.filter((product) => {
      return (
        (filter.category === '' || product.category === filter.category) &&
        (filter.minRating === '' || (product.rating && product.rating.rate >= parseFloat(filter.minRating))) &&
        (filter.maxPrice === '' || (product.price <= parseFloat(filter.maxPrice)))
      );
    });

    // Update the state with filtered products
    setProducts(filteredProducts);
  };

  const uniqueCategories = [...new Set(products.map((product) => product.category))];

  return (
    <div className='flex flex-row'>
      {/* Filter controls */}
      <div className='float-left w-1/3 p-2 text-black bg-black flex flex-col border-2 border-red-500 object-contain h-80'>
        <div className='bg-gray-200 object-cover border-2 border-green-500 w-80 h-80'>
          
        </div>
        
        
        
      </div>
      {/* className='' */}
      {/* Product grid */}
      
    </div>
  );
};

export default ProductList;
