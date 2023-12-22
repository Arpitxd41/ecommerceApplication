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
    <div className=''>
      {/* Filter controls */}
      <div>
        <label>
          Category:
          <select name="category" value={filter.category} onChange={handleFilterChange}>
            <option value="">All Categories</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label>
          Min Rating:
          <input type="number" name="minRating" value={filter.minRating} onChange={handleFilterChange} />
        </label>
        <label>
          Max Price:
          <input type="number" name="maxPrice" value={filter.maxPrice} onChange={handleFilterChange} />
        </label>
        <button onClick={handleFilterSubmit}>Apply Filters</button>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
