// "HOMEPAGE"
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarOne from '../components/navbarOne';
import Corousel from '../components/corousel';
import ProductList from '../components/productList';
import { validateToken } from '../utils/filter';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
 
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const successMessage = localStorage.getItem('successMessage');
    if (successMessage) {
        localStorage.removeItem('successMessage');
    }
    if (!authToken) {
      navigate('/login');
      return;
    }

    setUserDetails(userDetails);
    
    const fetchedProducts = [];
    setProducts(fetchedProducts);
    const isTokenValid = validateToken(authToken);
    if (!isTokenValid) {
      navigate('/login');
    }
  }, [ navigate ]);

  return (
    <div className='shadow-inner shadow-black bg-gradient-to-l from-black to-slate-900 text-white'>
      <div className='flex justify-center'>
        <NavbarOne />
      </div>

      <Corousel />
      <div className='z-40 relative flex flex-col justify-center md:flex-row items-center px-12 mt-64 mb-24 md:my-64 lg:my-16'>
        <div className='quicksand bg-black shadow-xl shadow-black md:px-12 items-center justify-center flex-col py-8 text-center my-8 md:my-20 lg:my-40 rounded-sm md:rounded-full align-middle lg:space-x-4'>
          <h4 className='animate-characters text-2xl md:text-4xl lg:text-4xl font-bold'>WELCOME !</h4>
          <h1 className='animate-characters text-lg lg:text-4xl font-bold'>{userDetails.firstName}</h1>
        </div>
      </div>
      <div className='flex justify-center bg-black w-full'>
        <ProductList products={products} userDetails={userDetails} />
      </div>
      <div className='p-2 object-contain h-fit'>
        <hr className='border-gray-950 my-12 relative z-40'/>
        <div className='footer w-full text-center flex justify-center h-40 relative z-40'>
          <div className="">
              <p className="object-contain h-12 items-center align-middle rounded-full px-8 py-2 bg-black shadow-xl shadow-black text-slate-300">
               <a href="{somelink}" className="hover:underline mb-2"> Made with <i className="fa fa-heart animate-characters h-12 text-lg"></i> by Arpit</a>
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
