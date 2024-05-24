import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import NavbarOne from '../../components/navbarOne.js';
import Corousel from '../../components/corousel.js';
import ProductList from '../../components/productList.js';
import AddProduct from '../../context/addProduct.js';
import Stats from '../../context/stats.js';
import Footer from '../../data/user/standardFooter.js';
import UserList from '../../context/userList.js';
import { validateToken } from '../../utils/filter.js';
import logo from '../../images/icons/2.png';
// import dashboardSample from '../images/SalesSampleDashboard.png'

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [activeContent, setActiveContent] = useState(null);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const navigate = useNavigate();
  const adminId = userDetails._id;

  useEffect(() => {
    const authToken = Cookies.get('authToken');
    const userDetails = JSON.parse(Cookies.get('userDetails'));
    const successMessage = Cookies.get('successMessage');
    if (successMessage) {
      Cookies.remove('successMessage');
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
      return;
    }

    if (userDetails.role !== 'ADMIN') {
      setIsUnauthorized(true);
    }
  }, [navigate]);

  const handleButtonClick = (content) => {
    if (isUnauthorized) {
      navigate('/login');
    } else {
      setActiveContent((prevContent) => (prevContent === content ? null : content));
      const offset = 200;
      window.scrollTo({
        top: document.documentElement.scrollHeight + offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className='shadow-inner shadow-black bg-gradient-to-l from-black to-slate-900 text-white'>
      <div className='flex justify-center'>
        <NavbarOne />
      </div>

      <Corousel />
      <div className='z-30 relative flex flex-col justify-center items-center px-12 h-screen lg:my-16'>
        {isUnauthorized ? (
          <div className='quicksand bg-red-600 shadow-xl shadow-black px-12 items-center justify-center flex-col py-2 text-center my-8 md:my-20 lg:my-40 rounded-full align-middle md:space-x-4 text-2xl md:text-4xl font-bold'>
            <h4 className='text-white'>Warning:</h4>
            <h1 className='text-white'>You are not authorized to access this page.</h1>
          </div>
        ) : (
          <div className='flex quicksand bg-black px-8 items-center justify-center flex-col py-8 text-center my-8 md:my-20 lg:my-40 rounded align-middle space-x-4 text-2xl md:text-4xl font-bold'>
            <img src={logo} alt='logo' className='h-40'/>
            <div>
              <h4 className='animate-characters'>{userDetails.role} ~ </h4>
              <h1 className='animate-characters'> {userDetails.firstName}</h1>
            </div>
          </div>
        )}
      </div>

      {/* Buttons to toggle visibility of product list and other functionalities */}
      <div className='sticky bottom-0 grid md:grid-cols-4 grid-cols-2 gap-5 justify-center py-4 px-2 bg-slate-950 bg-opacity-100 z-50'>
        <button className='bg-blue-600 text-white font-bold py-2 px-4 rounded-sm space-x-2' onClick={() => handleButtonClick('products')} >
          <i className="fa fa-list" aria-hidden="true"></i>
          <b>View Products</b>
        </button>
        <button className='bg-yellow-500 text-white font-bold py-2 px-4 rounded-sm space-x-2' onClick={() => handleButtonClick('addProduct')} >
          <i className="fa fa-plus-square" aria-hidden="true"></i>
          <b>Add Product</b>
        </button>
        <button className='bg-red-600 text-white font-bold py-2 px-4 rounded-sm space-x-2' onClick={() => handleButtonClick('users')} >
          <i className="fa fa-users" aria-hidden="true"></i>
          <b>View Users</b>
        </button>
        <button className='bg-lime-600 text-white font-bold py-2 px-4 rounded-sm space-x-2' onClick={() => handleButtonClick('stats')} >
          <i className="fa fa-bar-chart" aria-hidden="true"></i>
          <b>Show Stats</b>
        </button>
      </div>

      {/* Conditionally render content based on activeContent state */}
      <div id='content' className='flex justify-center bg-black w-full'>
        {activeContent === 'products' && <ProductList products={products} userDetails={userDetails} />}
        {activeContent === 'addProduct' && <AddProduct />}
        {activeContent === 'users' && <UserList adminId={adminId} />}
        {activeContent === 'stats' && <Stats />}
      </div>

      <div className=''>
        <Footer />
      </div>
    </div>
  );
};

export default AdminDashboard;
