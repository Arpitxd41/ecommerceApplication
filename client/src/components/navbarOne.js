// Navbar.js
import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import './navbar.css'
import logo from '../images/logo512.png';

const NavbarOne = ({ onSearch, isLoggedIn }) => {
  const [ searchQuery, setSearchQuery ] = useState('');
  const navigate = useNavigate();
  const handleSearch = () => {
    // Call the callback function passed from the parent component
    onSearch(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Trigger search on Enter key press
      const handleSearch = (searchQuery) => {
        // You can implement search logic here or call an API to search
        console.log('Searching for:', searchQuery);
      };
    
      handleSearch();
    }
  };

// stroke-linecap
// stroke-linejoin
// stroke-width
// class
// for
  const handleLogoClick = () => {
    // Handle navigation to home when the logo is clicked
    navigate('/');
  };
  return (
    <nav className='relative z-40 w-full'>
        <div className='flex flex-row py-2 px-4 justify-between bg-black  text-yellow-400 shadow-md shadow-black items-center
        lg:justify-evenly'>

            <div className="logo w-1/12 h-12" onClick={handleLogoClick}>
              <a href={'somelink'} >
                  <img src={logo} className='md:h-12 h-10 rounded-full' alt='appLogo' />
              </a>
            </div>

            <div className="relative flex items-center h-10 rounded-full bg-yellow-400 overflow-hidden
            lg:w-2/5 w-3/5">
                <div className="grid place-items-center h-12 w-12 text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                  className="search-bar peer rounded-r-full h-full w-full outline-none text-sm text-gray-700 pr-2 border-2 border-white"
                  type="text"
                  id="search"
                  placeholder="SEARCH SOMEHTING.."
                  onKeyDown={handleKeyPress || handleSearch}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} /> 
            </div>

            <ul className="nav-links flex-row justify-evenly w-1/12 items-center hidden
             lg:flex lg:w-2/5"> 

              <li className='rounded-sm px-5 py-2
              hover:shadow-black hover:shadow-md'>
                <Link className='flex flex-row items-center' to="/cart">
                  <i className="fa fa-shopping-cart" aria-hidden="true"> </i> 
                  <p className='hidden lg:flex ml-2 text-sm'>CART</p> 
                </Link>
              </li>

              <li className='rounded-sm px-5 py-2
               hover:shadow-black hover:shadow-md'>
                <Link className='flex flex-row items-center' to="/wishlist">
                  <i className="fa fa-heart" aria-hidden="true"> </i> 
                  <p className='hidden lg:flex ml-2 text-sm'>WISHLIST</p> 
                </Link>
              </li>   

              <li className='rounded-sm px-5 py-2
               hover:shadow-black hover:shadow-md'>
                <Link className='flex flex-row items-center' to="/profile">
                  <i className={`fa fa-user ${isLoggedIn ? 'text-green-500' : ''}`} aria-hidden="true"></i>  
                  <p className='hidden lg:flex ml-2 text-sm'>PROFILE</p> 
                </Link>
              </li>

            </ul>

            <div className='flex w-1/12 justify-center items-center
             lg:hidden'>
                <input type="checkbox" id="menu_checkbox" />
                <label htmlFor="menu_checkbox">
                  <div></div>
                  <div></div>
                  <div></div>
                </label>
            </div>

        </div>
    </nav>
  );
};

export default NavbarOne;
