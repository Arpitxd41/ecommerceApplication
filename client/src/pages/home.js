// HomePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarOne from '../components/navbarOne';
import hero from '../images/delivery.svg';
import Corousel from '../components/corousel';
import ProductList from '../components/productList';

const validateToken = (token) => {
  try {
    const tokenParts = token.split('.');
    const payload = JSON.parse(atob(tokenParts[1]));

    const currentTime = Math.floor(Date.now() / 1000);

    // Check if the token has expired
    if (payload.exp && payload.exp < currentTime) {
      return false;
    }

    // Additional checks based on your requirements
    // For example, check if the user is banned or has certain roles

    return true;
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
};

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (searchQuery) => {
    // You can implement search logic here or call an API to search
    console.log('Searching for:', searchQuery);
  };

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      // No token found, navigate to the login page
      navigate('/login');
      return;
    }
    // Fetch or set your products here
    // Example:
    const fetchedProducts = []; // replace with actual product fetching logic
    setProducts(fetchedProducts);

    const isTokenValid = validateToken(authToken); // Implement the token validation function
    if (!isTokenValid) {
      navigate('/login');
    }
  }, [ navigate ]);

  return (
    <div className='bg-gradient-to-r from-black to-fuchsia-900 text-white space-y-12
    lg:px-2 md:px-4 md:py-4'>
      <div>
        <NavbarOne />
        {/* <NavbarTwo /> */}
      </div>

      <Corousel />
      <div className='z-20 relative flex flex-col md:flex-row items-center px-12 py-24 md:py-0'>
        <div className='quicksand md:w-3/5 bg-black px-4 py-8 font-semibold bordered text-center -mr-6 rounded-full'>
          <h4 className='animate-characters text-6xl md:text-7xl lg:text-8xl'>WELCOME !</h4>
          <h1 className='animate-characters text-xl md:text-3xl'>to my Ecommerce Application</h1>
        </div>
        <div className='md:w-2/5 relative md:block hidden rounded-full'>
          <img src={hero} className='' />
        </div>
      </div>

      <ProductList products={products} />

      <hr className='border-gray-800'/>
      <div className='footer w-full text-center flex justify-center'>
        <div class="text-slate-400 text-md leading-6 md:w-1/4 space-y-2 p-4 object-contain text-center flex justify-center">
            <p class="object-contain">
              Made with 
              <i class="fa fa-heart animate-characters h-12 text-lg"></i> 
              by 
              <a href="" class="hover:underline mb-2">
                Arpit
              </a>
            </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
