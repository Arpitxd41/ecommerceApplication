// HomePage.js
import React, { useEffect, useState } from 'react';

import NavbarOne from '../components/navbarOne';
import FeaturedProducts from './featuredProducts';
import SpecialOffers from './specialOffers';
import NavbarTwo from '../components/navbarTwo';

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
    <div className='px-4 py-2 bg-gray-900 text-white'>
      <NavbarOne />
      <NavbarTwo />
      <h1 className='text-8xl font-bold'>Welcome to Our E-commerce Store</h1>
      <FeaturedProducts products={featuredProducts} />
      <SpecialOffers offers={specialOffers} />
    </div>
  );
};

export default HomePage;
