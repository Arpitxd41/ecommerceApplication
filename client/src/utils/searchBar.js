import React, { useState } from 'react';

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchData = (value) => {
    fetch('https://dummyjson.com/products')
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
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-11/12">
      <div className="relative flex items-center h-10 rounded-sm bg-red-500 overflow-hidden w-full">
        <div className="grid place-items-center h-12 w-20 text-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          className="search-bar peer h-full w-full outline-none text-md text-gray-700 font-semibold pr-2 border-2 border-white bg-gray-100"
          type="text"
          id="search"
          placeholder="SEARCH SOMETHING.."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
      </div>
      {showSuggestions && (
        <div className="absolute z-50 mt-1 bg-white rounded-md shadow-lg w-full">
          <ul className="max-h-40 overflow-y-auto bg-gray-100">
            {results.map((suggestion) => (
              <li
                key={suggestion.id}
                className="cursor-pointer py-1 px-4 hover:bg-gray-500"
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
