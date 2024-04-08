import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo512.png';
import SearchBar from '../utils/searchBar';

const NavbarOne = ({ isLoggedIn }) => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const userId = userDetails._id;
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (userDetails.role === 'ADMIN') {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className='relative z-40 w-full'>
      <div className='flex flex-row py-2 px-3 md:px-6 justify-between bg-slate-900 text-red-600 items-center lg:justify-evenly'>
        <div className="w-1/5 md:w-1/12 logo h-12" onClick={handleLogoClick}>
          <div >
            <img src={logo} className='md:h-12 h-10 rounded-full' alt='appLogo' />
          </div>
        </div>

        <div className='w-4/5 md:w-3/5'>
          <SearchBar />
        </div>

        <div className="lg:hidden z-50">
          <button onClick={toggleMenu} className="text-red-600 text-3xl focus:outline-none">
            <i className={`fa ${showMenu ? 'fa-times' : 'fa-bars'}`} aria-hidden="true"></i>
          </button>
        </div>

        <ul className={`lg:flex lg:w-2/5 ${showMenu ? 'block absolute right-5 top-16 space-y-2' : 'hidden'} justify-evenly lg:items-center`}>
          <li className='rounded-sm hover:shadow-black hover:shadow-md hover:opacity-100 bg-black lg:bg-transparent cursor-pointer'>
            <button className='block lg:flex lg:flex-row items-center py-4 px-6 object-contain
            lg:px-5 lg:py-2' onClick={handleLogoClick}>
              <i className="fa fa-home" aria-hidden="true"></i>
              <p className='hidden lg:flex ml-2 text-sm font-semibold text-gray-100'>HOME</p>
            </button>
          </li>

          <li className='rounded-sm hover:shadow-black hover:shadow-md hover:opacity-100 bg-black lg:bg-transparent'>
            <Link className='block lg:flex lg:flex-row items-center py-4 px-6 object-contain
            lg:px-5 lg:py-2' to={`/cart/${userId}`}>
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              <p className='hidden lg:flex ml-2 text-sm font-semibold text-gray-100'>CART</p>
            </Link>
          </li>

          <li className='rounded-sm hover:shadow-black hover:shadow-md hover:opacity-100 bg-black lg:bg-transparent'>
            <Link className='block lg:flex lg:flex-row items-center py-4 px-6 object-contain
            lg:px-5 lg:py-2' to={`/orders/${userId}`}>
              <i className="fa fa-shopping-bag" aria-hidden="true"></i>
              <p className='hidden lg:flex ml-2 text-sm font-semibold text-gray-100'>MY ORDERS</p>
            </Link>
          </li>

          <li className='rounded-sm hover:shadow-black hover:shadow-md hover:opacity-100 bg-black lg:bg-transparent'>
            <Link className='block lg:flex lg:flex-row items-center py-4 px-6 object-contain
            lg:px-5 lg:py-2' to={`/profile/${userId}`}>
              <i className='fa fa-user' aria-hidden="true"></i>
              <p className='hidden lg:flex ml-2 text-sm font-semibold text-gray-100'>PROFILE</p>
            </Link>
          </li>

        </ul>

      </div>
    </nav>
  );
};

export default NavbarOne;
