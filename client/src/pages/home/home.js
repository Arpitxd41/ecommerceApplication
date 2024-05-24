// "HOMEPAGE"
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import NavbarOne from '../../components/navbarOne';
import Corousel from '../../components/corousel';
import ProductList from '../../components/productList';
import { validateToken } from '../../utils/filter';
import Footer from '../../data/user/standardFooter';
import logo from '../../images/icons/2.png';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [initialized, setInitialized] = useState(false);
  const navigate = useNavigate();
 
  useEffect(() => {
    const authToken = Cookies.get('authToken');
    const storedUserDetails = JSON.parse(Cookies.get('userDetails') || '{}');
    const successMessage = Cookies.get('successMessage');
    const fetchedProducts = [];
    setProducts(fetchedProducts);
    if (successMessage) {
        localStorage.removeItem('successMessage');
    }
    if (!authToken || !storedUserDetails) {
      
      console.log('acquiring dummy user');
      const dummyUserDetails = {
        firstName: 'John',
        lastName: 'Doe',
        id: process.env.REACT_APP_JOHN_DOE,
        role: 'USER'
      };
      setUserDetails(dummyUserDetails);
    } else {
      setUserDetails(prevUserDetails => ({ ...prevUserDetails, ...storedUserDetails }));

      const isTokenValid = validateToken(authToken);
      if (!isTokenValid && userDetails.id !== process.env.REACT_APP_JOHN_DOE) {
        navigate('/login');
      }
    }
    setInitialized(true);
    return;
  }, [ navigate ]);

  useEffect(() => {
    if (initialized) {
      // console.log('user details', userDetails);
    }
  }, [initialized, userDetails]);

  return (
    <div className='shadow-inner shadow-black bg-black text-white'>
      <div className='flex justify-center'>
        <NavbarOne />
      </div>

      <div className=''>
        <Corousel />
      </div>
      <div className='z-30 relative flex flex-col justify-center items-center lg:flex-row px-12 h-screen cursor-pointer'>
        <div className='w-auto quicksand bg-black shadow shadow-black flex flex-col px-12 py-5 md:py-5 text-center justify-center items-center rounded align-middle md:space-x-4 text-2xl md:text-6xl font-semibold z-40'>
          <img src={logo} alt='logo' className='h-60'/>
          <div className='flex flex-col'>
            <h4 className='animate-characters'>WELCOME!</h4>
            <h1 className='text-3xl animate-characters'>{userDetails.firstName} {userDetails.lastName}</h1>
          </div>
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
