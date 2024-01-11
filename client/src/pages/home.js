// HomePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarOne from '../components/navbarOne';
// import hero from '../images/delivery.svg';
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
    <div className='shadow-inner shadow-black bg-gradient-to-l from-black to-fuchsia-900 text-white md:space-y-12 
    lg:px-2 md:px-4 md:py-4'>
      <div className='flex justify-center'>
        <NavbarOne />
        {/* <NavbarTwo /> */}
      </div>

      <Corousel />
      <div className='z-20 relative flex flex-col justify-center md:flex-row items-center px-12 lg:py-0'>
        <div className='quicksand bg-black shadow-xl shadow-black md:px-12 items-center justify-center md:flex-col flex-row py-8 text-center my-8 md:my-20 lg:my-40 rounded-sm md:rounded-full align-middle lg:space-x-4'>
          <h4 className='animate-characters text-2xl md:text-4xl lg:text-4xl font-bold'>WELCOME !</h4>
          <h1 className='animate-characters text-lg lg:text-4xl font-bold'> to my Ecommerce Application</h1>
        </div>
      </div>
      <div className=''>
        <ProductList products={products} />
      </div>
      <hr className='border-gray-800'/>
      <div className='footer w-full text-center flex justify-center'>
        <div className="text-slate-400 text-md leading-6 md:w-1/4 space-y-2 p-4 object-contain text-center flex justify-center">
            <p className="object-contain">
              Made with 
              <i className="fa fa-heart animate-characters h-12 text-lg"></i> 
              by 
              <a href={"somelink"} className="hover:underline mb-2">
                Arpit
              </a>
            </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
