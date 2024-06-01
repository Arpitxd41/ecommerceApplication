import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash'
const SearchBar = ({ userId }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  // const SERVER = process.env.REACT_APP_DEVELOPMENT_SERVER;
  const SERVER = process.env.REACT_APP_PRODUCTION_SERVER;

  const fetchData = (value) => {
    if(_.isEmpty(value)){
      return;
    }

    const request = `${SERVER}/all_products`;
    
    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        const products = data.products;
        const filteredResults = products.filter((product) => {
          const titleMatch = product.title && product.title.toLowerCase().includes(value.toLowerCase());
          const brandMatch = product.brand && product.brand.toLowerCase().includes(value.toLowerCase());
          const categoryMatch = product.category && product.category.toLowerCase().includes(value.toLowerCase());
          return titleMatch || brandMatch || categoryMatch;
        });
      
        setResults(filteredResults.slice(0, 5));
        setShowSuggestions(true);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      
  };

  const searchWithDebounce = useCallback(_.debounce((value) => {
    fetchData(value);
  }, 500, {leading: true})
  , []);

  const handleChange = (value) => {
    setInput(value);
    searchWithDebounce(value);
  };

  const handleSelectSuggestion = (suggestion) => {
    setInput(suggestion.title);
    
    const productId = suggestion._id;
    const productUrl = `/product/${productId}`;
    navigate(productUrl);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-11/12">
      <div className="relative flex items-center h-10 rounded-full w-full">
        <div className="items-center h-10 text-gray-100 px-2 py-2 bg-blue-500 rounded-l-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          className="search-bar h-10 w-full outline-none text-sm md:text-md text-gray-800 font-semibold pr-2 pl-2 border-2 border-white bg-gray-100 rounded-r-full"
          type="search"
          id="search"
          autoComplete='off'
          placeholder="SEARCH SOMETHING.."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => (e.key === 'Enter') && handleChange(e.target.value)}
        />
      </div>
      {showSuggestions && (
        <div className="absolute z-50 mt-1 bg-black opacity-90 text-white text-opacity-100 rounded-sm shadow-lg w-full">
          <ul className="max-h-40 overflow-y-auto">
            {results.map((suggestion) => (
              <li
                key={suggestion._id}
                className="text-white cursor-pointer py-1 px-4 bg-black hover:bg-red-600 hover:opacity-100 hover:font-bold"
                onClick={() => handleSelectSuggestion(suggestion)}
              >
                {suggestion.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
