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
    <div className="container mx-auto mt-5 p-4 bg-stone-950 rounded shadow-md">
      {/* Filter controls */}
      <div className="bg-yellow-300 p-4 rounded-md mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-5 mb-4">
            <label className="block text-sm font-semibold">Category:</label>
            <select
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              name="category"
              value={filter.category}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-5 mb-4">
            <label className="block text-sm font-semibold">Min Rating:</label>
            <select
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              name="minRating"
              value={filter.minRating}
              onChange={handleFilterChange}
            >
              {/* Add rating options as needed */}
              <option value="">Any</option>
              <option value="4">4 stars</option>
              <option value="3">3 stars</option>
              {/* ... */}
            </select>
          </div>
          <div className="flex mb-4">
            <div className="space-y-5 mr-2">
              <label className="block text-sm font-semibold">Min Price:</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                name="minPrice"
                value={filter.minPrice}
                onChange={handleFilterChange}
              />
            </div>
            <div className='space-y-5'>
              <label className="block text-sm font-semibold">Max Price:</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                name="maxPrice"
                value={filter.maxPrice}
                onChange={handleFilterChange}
              />
            </div>
          </div>
          <div cla>
            <button
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
              onClick={handleFilterSubmit}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
