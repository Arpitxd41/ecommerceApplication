import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import logo from '../images/logo512.png';
import SearchBar from '../utils/searchBar';

const NavbarOne = ({ onSearch, isLoggedIn }) => {
  // const { userId } = useParams();
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const userId = userDetails._id;
  // const [searchQuery, setSearchQuery] = useState('');
  const [userCart, setUserCart] = useState(null);
  const navigate = useNavigate();

  // Function to fetch user's cart data
  const fetchUserCart = useCallback( async () => {
    try {
      const response = await axios.get(`https://localhost:5000/user/${userId}/cart`);
      setUserCart(response.data);
    } catch (error) {
      console.error('Error fetching user cart:', error);
    }
  }, [userId]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserCart();
    }
  }, [fetchUserCart, isLoggedIn]);

  const handleLogoClick = () => {
    navigate('/');
  };
  return (
    <nav className='relative z-40 w-full'>
        <div className='flex flex-row py-2 px-4 justify-between bg-slate-900 text-red-500 items-center
        lg:justify-evenly'>

            <div className="logo w-1/10 h-12" onClick={handleLogoClick}>
              <a href={'/'} >
                  <img src={logo} className='md:h-12 h-10 rounded-full' alt='appLogo' />
              </a>
            </div>

            <div className='w-1/3'>
              <SearchBar />
            </div>

            <ul className="nav-links flex-row justify-evenly w-4/5 items-center hidden
             lg:flex lg:w-2/5"> 

              <li className='rounded-sm px-5 py-2 hover:shadow-black hover:shadow-md'>
                <Link className='flex flex-row items-center' to={`/`}>
                  <i className="fa fa-home" aria-hidden="true"></i>
                  <p className='hidden lg:flex ml-2 text-sm font-semibold text-gray-100'>HOME</p>
                  {userCart && <span className="ml-1 text-xs">{userCart.cartItems.length}</span>}
                </Link>
              </li>

              <li className='rounded-sm px-5 py-2 hover:shadow-black hover:shadow-md'>
                <Link className='flex flex-row items-center' to={`/cart/${userId}`}>
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                  <p className='hidden lg:flex ml-2 text-sm font-semibold text-gray-100'>CART</p>
                  {userCart && <span className="ml-1 text-xs">{userCart.cartItems.length}</span>}
                </Link>
              </li>

              <li className='rounded-sm px-5 py-2
               hover:shadow-black hover:shadow-md'>
                <Link className='flex flex-row items-center' to={`/orders/${userId}`}>
                  <i class="fa fa-shopping-bag" aria-hidden="true"></i>
                  <p className='hidden lg:flex ml-2 text-sm font-semibold text-gray-100'>MY ORDERS</p> 
                </Link>
              </li>   

              <li className='rounded-sm px-5 py-2
               hover:shadow-black hover:shadow-md'>
                <Link className='flex flex-row items-center' to={`/profile/${userId}`}>
                  <i className={`fa fa-user ${isLoggedIn ? 'text-green-500' : ''}`} aria-hidden="true"></i>  
                  <p className='hidden lg:flex ml-2 text-sm font-semibold text-gray-100'>PROFILE</p>
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
