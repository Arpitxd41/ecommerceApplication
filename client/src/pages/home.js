// HomePage.js
import React, { useEffect, useState } from 'react';
import FeaturedProducts from './featuredProducts';
import SpecialOffers from './specialOffers';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [specialOffers, setSpecialOffers] = useState([]);

  useEffect(() => {
    // Fetch product data from your API
    // Example: fetch('your_api_url/products').then(response => response.json()).then(data => setFeaturedProducts(data));

    // Fetch special offers
    // Example: fetch('your_api_url/offers').then(response => response.json()).then(data => setSpecialOffers(data));
  }, []);

  return (
    <div>
      <h1>Welcome to Our E-commerce Store</h1>
      <FeaturedProducts products={featuredProducts} />
      <SpecialOffers offers={specialOffers} />
    </div>
  );
};

export default HomePage;
