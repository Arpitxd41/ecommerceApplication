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
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch or set your products here
    // Example:
    const fetchedProducts = []; // replace with actual product fetching logic
    setProducts(fetchedProducts);
  }, []);

  return (
    <div className='lg:px-12 px-4 py-4 bg-gradient-to-r from-black  to-fuchsia-900 text-white space-y-12'>
      <div>
        <NavbarOne />
        <NavbarTwo />
      </div>
      <div className='animate-characters bordered py-20'>
        <h4 className='text-9xl'>WELCOME !</h4>
        <h1 className='text-3xl'>to Ecommerce Application</h1>
      </div>

      <ProductList />
      <Corousel />

      <hr className='border-gray-800'/>
      <div className='w-full text-center flex justify-center'>
        <div class="text-slate-400 text-md leading-6 w-1/4  space-y-2 p-4 object-contain text-center flex justify-center">
            <p class="object-contain">Made with <i class="fa fa-heart animate-characters h-12 text-lg"></i> by <a href="" class="hover:underline mb-2">Arpit</a></p>
            {/* <p class="">last updated :</p> */}
            {/* <p class="date"></p> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
