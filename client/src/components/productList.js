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
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products${selectedCategory ? `/category/${selectedCategory}` : ''}`);
        const { products } = response.data;
      
        if (sortingType === 'none') {
          setMatchedProducts(products);
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
        
          // Mapping over the sorted values to find the corresponding product for each value
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
    <div className="w-full flex flex-col-reverse bg-black relative z-20 rounded-sm shadow-md justify-center py-5 lg:px-12 
    md:px-1 lg:flex-row">
      <div className="float-none grid grid-cols-2 gap-1 mt-5
        md:grid-cols-4
        lg:gap-6 lg:grid-cols-3 lg:w-3/4 lg:float-left">
        {sortedValues.length > 0 ? (
          sortedValues.map(value => (
          <ProductCard key={value.id} product={value} />
            ))
          ) : (
            matchedProducts.length > 0 && matchedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
           ))
        )}
      </div>

      <div className='flex justify-center float-none text-center align-top
      lg:w-80 lg:float-right lg:mt-5 lg:ml-5'>
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
