// "HOMEPAGE"
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarOne from '../components/navbarOne';
import Corousel from '../components/corousel';
import ProductList from '../components/productList';
import { validateToken } from '../utils/filter';
import Footer from '../data/user/standardFooter';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
 
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    const successMessage = localStorage.getItem('successMessage');
    
    if (successMessage) {
        localStorage.removeItem('successMessage');
    }

    if (!authToken || !storedUserDetails) {
      // guest details if not logged in 
      const dummyUserDetails = {
        firstName: 'John',
        lastName: 'Doe',
        id: process.env.REACT_APP_JOHN_DOE,
        role: 'USER'
      };
      setUserDetails(dummyUserDetails);
      return;
    }

    setUserDetails(storedUserDetails);
    
    const fetchedProducts = [];
    setProducts(fetchedProducts);

    const isTokenValid = validateToken(authToken);
    if (!isTokenValid) {
      navigate('/login');
    }
  }, [ navigate ]);

  return (
    <div className='shadow-inner shadow-black bg-black text-white'>
      <div className='flex justify-center'>
        <NavbarOne userDetails={userDetails} />
      </div>

      <Corousel />
      <div className='z-40 relative flex flex-col justify-center md:flex-row items-center px-12 mt-64 mb-24 md:my-64 lg:my-16'>
        <div className='w-5/6 md:w-3/5 quicksand bg-black shadow-xl shadow-black px-12 items-center justify-center flex flex-col py-2 md:py-5 text-center my-8 md:my-20 lg:my-40 rounded-full align-middle md:space-x-4 text-2xl md:text-4xl font-bold'>
          <h4 className='animate-characters'>WELCOME !</h4>
          <h1 className='text-lg animate-characters'>{userDetails.firstName} {userDetails.lastName}</h1>
        </div>
      </div>
      <div className='flex justify-center bg-black w-full'>
        <ProductList products={products} userDetails={userDetails} />
      </div>
      <div className='p-2 object-contain h-fit'>
        <hr className='border-gray-950 my-12 relative z-40'/>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
