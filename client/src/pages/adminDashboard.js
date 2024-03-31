import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarOne from '../components/navbarOne.js';
import Corousel from '../components/corousel.js';
import ProductList from '../components/productList.js';
import AddProduct from '../context/addProduct.js';
import Stats from '../context/stats.js';
import UserList from '../context/userList.js';
import { validateToken } from '../utils/filter.js';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [activeContent, setActiveContent] = useState(null);
  const navigate = useNavigate();
  const adminId = userDetails._id;
  console.log(adminId);

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
  }, [navigate]);

  // Function to handle button click and set active content
  const handleButtonClick = (content) => {
    setActiveContent((prevContent) => (prevContent === content ? null : content));
  };

  return (
    <div className='shadow-inner shadow-black bg-gradient-to-l from-black to-slate-900 text-white'>
      <div className='flex justify-center'>
        <NavbarOne />
      </div>

      <Corousel />
      <div className='z-40 relative flex flex-col justify-center md:flex-row items-center px-12 mt-64 mb-24 md:my-64 lg:my-16'>
        <div className='quicksand bg-black shadow-xl shadow-black px-12 items-center justify-center flex-col py-8 text-center my-8 md:my-20 lg:my-40 rounded-full align-middle md:space-x-4 text-2xl md:text-4xl font-bold'>
          <h4 className='animate-characters'>{userDetails.role} :</h4>
          <h1 className='animate-characters'>{userDetails.firstName}</h1>
        </div>
      </div>

      {/* Buttons to toggle visibility of product list and other functionalities */}
      <div className='sticky bottom-0 grid md:grid-cols-4 grid-cols-2 gap-5 justify-center py-4 px-2 bg-slate-950 bg-opacity-100 z-50'>
        <button className='bg-blue-600 text-white font-bold py-2 px-4 rounded-sm space-x-2' onClick={() => handleButtonClick('products')} >
          <i class="fa fa-list" aria-hidden="true"></i>
          <b>View Products</b>
        </button>
        <button className='bg-yellow-500 text-white font-bold py-2 px-4 rounded-sm space-x-2' onClick={() => handleButtonClick('addProduct')} >
          <i class="fa fa-plus-square" aria-hidden="true"></i>
          <b>Add Product</b>
        </button>
        <button className='bg-red-600 text-white font-bold py-2 px-4 rounded-sm space-x-2' onClick={() => handleButtonClick('users')} >
          <i class="fa fa-users" aria-hidden="true"></i>
          <b>View Users</b>
        </button>
        <button className='bg-lime-600 text-white font-bold py-2 px-4 rounded-sm space-x-2' onClick={() => handleButtonClick('stats')} >
          <i class="fa fa-bar-chart" aria-hidden="true"></i>
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

export default AdminDashboard;
