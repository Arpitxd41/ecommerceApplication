import React, { useState } from 'react';

const SearchBar = ({ userId }) => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dummyProducts = process.env.REACT_APP_PRODUCTS;
  const dummyProduct = process.env.REACT_APP_PRODUCT;

  const fetchData = (value) => {
    fetch(dummyProducts)
      .then((response) => response.json())
      .then((data) => {
        const products = data.products || [];
        const filteredResults = products.filter((product) => {
          const titleMatch = product.title.toLowerCase().includes(value.toLowerCase());
          const brandMatch = product.brand.toLowerCase().includes(value.toLowerCase());
          const categoryMatch = product.category.toLowerCase().includes(value.toLowerCase());
          return titleMatch || brandMatch || categoryMatch;
        });
        setResults(filteredResults.slice(0, 5));
        setShowSuggestions(true);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const handleSelectSuggestion = (suggestion) => {
    setInput(suggestion.title);
    const productNumber = suggestion.id;
    const productUrl = `${dummyProduct}/${productNumber}`;
    window.location.href = productUrl;
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-11/12">
      <div className="relative flex items-center h-10 rounded-full w-full">
        <div className="items-center h-10 text-gray-100 px-2 py-2 bg-red-600 rounded-l-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          className="search-bar h-10 w-full outline-none text-sm md:text-md text-gray-800 font-semibold pr-2 pl-2 border-2 border-white bg-gray-100 rounded-r-full"
          type="text"
          id="search"
          placeholder="SEARCH SOMETHING.."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
      </div>
      {showSuggestions && (
        <div className="absolute z-50 mt-1 bg-black opacity-90 text-white text-opacity-100 rounded-sm shadow-lg w-full">
          <ul className="max-h-40 overflow-y-auto">
            {results.map((suggestion) => (
              <li
                key={suggestion.id}
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
