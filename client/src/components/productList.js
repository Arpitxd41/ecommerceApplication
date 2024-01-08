import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './productCard';
import ProductFilter from './productFilter';

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortingOrder, setSortingOrder] = useState('default');
  const [sortingType, setSortingType] = useState('none');
  const [sortedValues, setSortedValues] = useState([]);
  const [matchedProducts, setMatchedProducts] = useState([]);

  useEffect(() => {
    // FETCH PRODUCTS BASED ON THE SELECTED CATEGORY :
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products${selectedCategory ? `/category/${selectedCategory}` : ''}`);
        const { products } = response.data;
      
        if (sortingType === 'none') {
          setMatchedProducts(products);  // Updated line
        } else {
          const values = sortingType === 'rating'
            ? products.map(product => product.rating)
            : sortingType === 'price'
            ? products.map(product => product.price)
            : [];
        
          console.log(`All ${sortingType === 'rating' ? 'Ratings' : 'Prices'}:`, values);
        
          let sortedValues = [...values];
        
          // SORTED VALUES BASED ON THEIR ORDER OF SORTING :
          if (sortingOrder === 'ascending') {
            sortedValues = sortedValues.sort((a, b) => a - b);
          } else if (sortingOrder === 'descending') {
            sortedValues = sortedValues.sort((a, b) => b - a);
          }
        
          setSortedValues(sortedValues);
        
          console.log(`Sorted ${sortingType === 'rating' ? 'Ratings' : 'Prices'}:`, sortedValues);
        
          // Map over the sorted values to find the corresponding product for each value
          const sortedProducts = sortedValues.map(value => {
            return products.find(product => (sortingType === 'rating' ? product.rating : product.price) === value);
          });
        
          setMatchedProducts(sortedProducts);  // Updated line
          console.log("Sorted Products:", sortedProducts);
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
    <div className="container flex flex-col-reverse px-6 py-12 bg-black relative z-20 bg-opacity-80 rounded-sm shadow-md justify-between max-w-max
    lg:px-8 lg:flex-row">

      <div className="float-none grid grid-cols-2 gap-3 md:gap-6 mt-5
       md:grid-cols-3 lg:grid-cols-3 lg:w-3/4 lg:float-left">
        {matchedProducts.length > 0 && matchedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className='float-none text-center align-top
      lg:w-1/4 lg:float-right lg:mt-5 lg:ml-5'>
        <ProductFilter 
          onCategoryChange={handleCategoryChange}
          onSortingTypeChange={handleSortingTypeChange}
          onSortingChange={handleSortingChange}
        />
      </div>

    </div>

  )
}

export default ProductList;
