import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './productCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({
    category: '',
    minRating: '',
    sortBy: 'price',
    order: '',
    priceRange: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products?limit=0&');
        setProducts(response.data); // Use response.data to access the array of products
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


    // Check if products is an array before mapping over it
    const productItems = Array.isArray(products) ? (
      products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))
    ) : (
      <p>Loading...</p>
    );
    
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => {
      console.log('Previous Filter:', prevFilter);
      return { ...prevFilter, [name]: value };
    });
  };

  const handleFilterSubmit = () => {
    const filteredProducts = products.filter((product) => {
      return (
        (filter.category === '' || product.category === filter.category) &&
        (filter.minRating === '' || (product.rating && product.rating.rate >= parseFloat(filter.minRating))) &&
        (filter.priceRange === '' || (product.price <= parseFloat(filter.priceRange)))
      );
    });

    console.log('Filter:', filter);
    console.log('Filtered Products:', filteredProducts);

    let sortedProducts = [...filteredProducts];
    if (filter.sortBy === 'price') {
      if (filter.order === 'low to high') {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (filter.order === 'high to low') {
        sortedProducts.sort((a, b) => b.price - a.price);
      }
    } else if (filter.sortBy === 'rating') {
      sortedProducts.sort((a, b) => {
        const ratingA = a.rating ? a.rating.rate : 0;
        const ratingB = b.rating ? b.rating.rate : 0;
        return ratingB - ratingA;
      });
    }

    // Apply price range filter if selected
    if (filter.priceRange) {
      const [min, max] = filter.priceRange.split('-');
      sortedProducts = sortedProducts.filter(
        (product) => product.price >= parseFloat(min) && product.price <= parseFloat(max)
      );
    }

    // Update the state with sorted and filtered products
    setProducts(sortedProducts);
  };

  const uniqueCategories = [...new Set(products.map((product) => product.category))];
  const sortByOptions = ['price', 'rating'];
  const orderOptions = ['low to high', 'high to low'];
  const priceRangeOptions = [
    'less than 500',
    '500-1000',
    '1000-5000',
    '5000-12000',
    '12000-25000',
    '25000 and above',
  ];

  return (
    <div className="container mx-auto mt-5 p-4 bg-stone-950 rounded shadow-md flex flex-row justify-between space-x-8">
      {/* Filter controls */}
      <div className="float-left w-1/4 bg-yellow-300 p-4 rounded-md mb-4 text-white mt-4">
        <div className="sticky bg-stone-950 px-4 py-12 space-y-8 rounded-md">
          <div className="flex flex-col">
            <p className="text-sm font-semibold">Category:</p>
            <select
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black font-semibold"
              name="category"
              value={filter.category}
              onChange={handleFilterChange}
            >
              <option value="">All *</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <p className="block text-sm font-semibold">Min Rating:</p>
            <select
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black font-semibold"
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
            <div className="mr-2">
              <p className="block text-sm font-semibold">Sort By:</p>
              <select
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black font-semibold"
                name="sortBy"
                value={filter.sortBy}
                onChange={handleFilterChange}
              >
                {sortByOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="block text-sm font-semibold">Order:</p>
              <select
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black font-semibold"
                name="order"
                value={filter.order}
                onChange={handleFilterChange}
              >
                {orderOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <p className="block text-sm font-semibold">Price Range:</p>
            <select
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black font-semibold"
              name="priceRange"
              value={filter.priceRange}
              onChange={handleFilterChange}
            >
              <option value="">Any</option>
              {priceRangeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              className="bg-red-700 font-semibold text-white py-2 px-5 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
              onClick={handleFilterSubmit}
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="float-right w-3/4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
