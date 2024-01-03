// HomePage.js
import React, { useEffect, useState } from 'react';

import NavbarOne from '../components/navbarOne';
import hero from '../images/delivery.svg';
// import NavbarTwo from '../components/navbarTwo';
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
    <div className='bg-gradient-to-r from-black  to-fuchsia-900 text-white space-y-12 border
    lg:px-12 md:px-4 md:py-4'>
      <div>
        <NavbarOne />
        {/* <NavbarTwo /> */}
      </div>
      <div className='flex flex-col md:flex-row items-center px-12 py-24 md:py-0'>
        <div className='quicksand md:w-3/5 animate-characters bordered text-center md:text-left'>
          <h4 className='text-6xl md:text-7xl lg:text-9xl'>WELCOME !</h4>
          <h1 className='text-xl md:text-3xl'>to Ecommerce Application</h1>
        </div>
        <div className='md:w-2/5 relative md:block hidden'>
          <img src={hero} className='' />
        </div>
      </div>

      <ProductList />
      <Corousel />

      <hr className='border-gray-800'/>
      <div className='footer w-full text-center flex justify-center'>
        <div class="text-slate-400 text-md leading-6 md:w-1/4 space-y-2 p-4 object-contain text-center flex justify-center">
            <p class="object-contain">Made with <i class="fa fa-heart animate-characters h-12 text-lg"></i> by <a href="" class="hover:underline mb-2">Arpit</a></p>
            {/* <p class="">last updated :</p> */}
            {/* <p class="date"></p> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
