import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import logo from '../images/icons/21.png';
import SearchBar from '../utils/searchBar';

const NavbarOne = () => {
  let user = Cookies.get('userDetails');
  let userId = user ? JSON.parse(user)._id : process.env.REACT_APP_JOHN_DOE;
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (user && JSON.parse(user).role === 'ADMIN') {
      navigate(`/dashboard/${userId}`);
    } else {
      navigate('/');
    }
  };

  const handleNavigation = (path) => {
    if (!userId || userId === process.env.REACT_APP_JOHN_DOE) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  const handleLoginClick = () => {
    if (!userId || userId === process.env.REACT_APP_JOHN_DOE) {
      navigate('/login');
    } else {
      Cookies.remove('userDetails');
      navigate('/login');
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className='relative z-40 w-full'>
      <div className='flex flex-row py-2 px-3 md:px-6 justify-between bg-slate-950 text-yellow-500 items-center lg:justify-evenly'>
        <div className="w-1/5 md:w-1/12 logo h-12" onClick={handleLogoClick}>
          <div >
            <img src={logo} className='md:h-14 h-12 rounded-full' alt='appLogo' />
          </div>
        </div>

        <div className='w-4/5 md:w-3/5'>
          <SearchBar />
        </div>

        <div className="lg:hidden z-50 w-8">
          <button onClick={toggleMenu} className="text-red-500 text-3xl focus:outline-none">
            <i className={`fa ${showMenu ? 'fa-times' : 'fa-bars'}`} aria-hidden="true"></i>
          </button>
        </div>

        <ul className={`flex bg-black flex-col lg:flex-row lg:w-2/5 ${showMenu ? 'block absolute z-auto cursor-pointer right-2 top-16 space-y-2' : 'hidden lg:flex'} justify-evenly lg:items-center`}>
          <li className='rounded-sm hover:bg-black hover:shadow-md hover:opacity-100 bg-stone-900 lg:bg-transparent z-40'>
            <button className='flex lg:flex-row items-center py-4 px-6 object-contain space-x-2
            lg:px-5 lg:py-2' onClick={handleLogoClick}>
              <i className="fa fa-home" aria-hidden="true"></i>
              <p className='flex text-sm font-semibold text-gray-100'>HOME</p>
            </button>
          </li>

          <li className='rounded-sm hover:bg-black hover:shadow-md hover:opacity-100 bg-stone-900 lg:bg-transparent z-40'>
            <button className='flex lg:flex-row items-center py-4 px-6 object-contain space-x-2
            lg:px-5 lg:py-2' onClick={() => handleNavigation(`/cart/${userId}`)}>
              <i className="fa fa-shopping-cart text-red-500" aria-hidden="true"></i>
              <p className='flex text-sm font-semibold text-gray-100'>CART</p>
            </button>
          </li>

          <li className='rounded-sm hover:bg-black hover:shadow-md hover:opacity-100 bg-stone-900 lg:bg-transparent z-40'>
            <button className='flex lg:flex-row items-center py-4 px-6 object-contain space-x-2
            lg:px-5 lg:py-2' onClick={() => handleNavigation(`/orders/${userId}`)}>
              <i className="fa fa-shopping-bag text-blue-500" aria-hidden="true"></i>
              <p className='flex text-sm font-semibold text-gray-100'>ORDERS</p>
            </button>
          </li>

          <li className='rounded-sm hover:bg-black hover:shadow-md hover:opacity-100 bg-stone-900 lg:bg-transparent z-40'>
            <button className='flex lg:flex-row items-center py-4 px-6 object-contain space-x-2
            lg:px-5 lg:py-2' onClick={() => handleNavigation(`/profile/${userId}`)}>
              <i className='fa fa-user text-lime-500' aria-hidden="true"></i>
              <p className='flex text-sm font-semibold text-gray-100'>PROFILE</p>
            </button>
          </li>
          
          <li className='rounded-sm hover:bg-black hover:shadow-md hover:opacity-100 bg-stone-900 lg:bg-transparent z-40'>
            <button className='flex lg:flex-row items-center py-4 px-6 object-contain space-x-2
            lg:px-5 lg:py-2' onClick={handleLoginClick}>
              <i className={`fa ${!userId || userId === process.env.REACT_APP_JOHN_DOE ? 'fa-power-off' : 'fa-sign-out'} text-amber-500`} aria-hidden="true"></i>
              <p className='flex text-sm font-semibold text-gray-100'>{!userId || userId === process.env.REACT_APP_JOHN_DOE ? 'LOGIN' : 'LOGOUT'}</p>
            </button>
          </li>

        </ul>

      </div>
    </nav>
  );
};

export default NavbarOne;
