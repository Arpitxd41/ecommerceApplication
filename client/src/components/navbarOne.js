// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'
import logo from '../images/logo512.png';

const NavbarOne = () => {
  return (
    <nav>
        <div className='flex flex-row rounded-t-lg py-2 px-4 justify-evenly bg-gray-600 text-teal-50 font-bold'>
            <div className="logo w-2/12 h-12">
              <a href='' >
                  <img src={logo} className='h-12' />
              </a>
            </div>
            <ul className="nav-links flex flex-row justify-evenly w-10/12 items-center">
              <li>
                  <div class="relative flex items-center w-96 h-10 rounded-full bg-yellow-300 overflow-hidden">
                    <div class="grid place-items-center h-12 w-12 text-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input class="peer rounded-r-full h-full w-full outline-none text-sm text-gray-700 pr-2 border-2 border-white font-semibold" type="text" id="search" placeholder="Search something.." /> 
                </div>
              </li>
              <li>
                <Link to="/products">Categories</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/">Profile</Link>
              </li>              
            </ul>
            <div className=''>
                <input type="checkbox" id="menu_checkbox" />
                <label for="menu_checkbox">
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
