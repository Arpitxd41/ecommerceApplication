// HomePage.js
import React, { useEffect, useState } from 'react';

import NavbarOne from '../components/navbarOne';
import FeaturedProducts from './featuredProducts';
import SpecialOffers from './specialOffers';
import NavbarTwo from '../components/navbarTwo';
import Corousel from '../components/corousel';
import ProductList from '../components/productList';

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
    <div className='px-4 py-2 bg-gradient-to-r from-black  to-fuchsia-900 text-white space-y-12'>
      <div>
        <NavbarOne />
        <NavbarTwo />
      </div>
      <div className='text-center'>
        <h4 className='text-5xl font-bold'>WELCOME !</h4>
        <h1 className='text-2xl'>to Ecommerce Application</h1>
      </div>
      <ProductList />
      <Corousel />

      <hr className='border-gray-800'/>

      <div className='w-full text-center flex justify-center'>
        <div class="text-slate-600 text-md leading-6 w-1/4  space-y-2 p-4 object-contain text-center flex justify-center">
            <p class="object-contain">Made with <i class="fa fa-heart animate-characters h-12 text-sm"></i> by <a href="" class="hover:underline mb-2">Arpit</a></p>
            {/* <p class="">last updated :</p> */}
            {/* <p class="date"></p> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
