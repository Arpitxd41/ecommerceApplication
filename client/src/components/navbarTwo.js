// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import offerSectionLabel from '../images/icons/offer.png'
import clothing from '../images/icons/cloth.png'
import gadgets from '../images/icons/electronics.png'
import cosmetics from '../images/icons/cosmetic.png'
import camping from '../images/icons/outdoor.png'
import premium from '../images/icons/premium.png'
import event from '../images/icons/event.png'
import seller from '../images/icons/seller.png'
import whey from '../images/icons/protein.png'
import Subscriptions from '../images/icons/subscription.png'

const NavbarTwo = () => {
  return (
    <nav className='w-full'>
        <div>
        </div>
        <ul className='overflow-x-auto w-full flex flex-row justify-between bg-yellow-300 text-gray-950 rounded-b-lg py-2 text-xs space-x-7 px-6'>
          <li className="flex-shrink-0 bg-yellow-300 w-1/8 rounded-md text-center shadow-black hover:shadow-xl h-16 items-baseline align-middle overflow-hidden px-6 pb-3">
            <a href='' className="flex flex-col">
                <img src={offerSectionLabel} className="h-10 w-full object-contain"/>
                <p>Best Offers</p>
            </a>
          </li>
          <li className="flex-shrink-0 bg-yellow-300 w-1/8 rounded-md text-center shadow-black hover:shadow-lg h-16 items-baseline align-middle overflow-hidden px-6 pb-3">
            <a href='' className="flex flex-col">
                <img src={clothing} className="h-10 w-full object-contain"/>
                <p>Clothing</p>
            </a>
          </li>
          <li className="flex-shrink-0 bg-yellow-300 w-1/8 rounded-md text-center shadow-black hover:shadow-lg h-16 items-baseline align-middle overflow-hidden px-6 pb-3">
            <a href='' className="flex flex-col">
                <img src={gadgets} className="h-10 w-full object-contain"/>
                <p>Electronics</p>
            </a>
          </li>
          <li className="flex-shrink-0 bg-yellow-300 w-1/8 rounded-md text-center shadow-black hover:shadow-lg h-16 items-baseline align-middle overflow-hidden px-6 pb-3">
            <a href='' className="flex flex-col">
                <img src={cosmetics} className="h-10 w-full object-contain"/>
                <p>cosmetics</p>
            </a>
          </li>
          <li className="flex-shrink-0 bg-yellow-300 w-1/8 rounded-md text-center shadow-black hover:shadow-lg h-16 items-baseline align-middle overflow-hidden px-6 pb-3">
            <a href='' className="flex flex-col">
                <img src={camping} className="h-10 w-full object-contain"/>
                <p>Outdoor Specials</p>
            </a>
          </li>
          <li className="flex-shrink-0 bg-yellow-300 w-1/8 rounded-md text-center shadow-black hover:shadow-lg h-16 items-baseline align-middle overflow-hidden px-6 pb-3">
            <a href='' className="flex flex-col">
                <img src={whey} className="h-10 w-full object-contain"/>
                <p>Nutrition & Supplements</p>
            </a>
          </li>
          <li className="flex-shrink-0 bg-yellow-300 w-1/8 rounded-md text-center shadow-black hover:shadow-lg h-16 items-baseline align-middle overflow-hidden px-6 pb-3">
            <a href='' className="flex flex-col">
                <img src={Subscriptions} className="h-10 w-full object-contain"/>
                <p>Subscriptions</p>
            </a>
          </li>
          <li className="flex-shrink-0 bg-yellow-300 w-1/8 rounded-md text-center shadow-black hover:shadow-lg h-16 items-baseline align-middle overflow-hidden px-6 pb-3">
            <a href='' className="flex flex-col">
                <img src={premium} className="h-10 w-full object-contain"/>
                <p>Premium Membership</p>
            </a>
          </li>
          <li className="flex-shrink-0 bg-yellow-300 w-1/8 rounded-md text-center shadow-black hover:shadow-lg h-16 items-baseline align-middle overflow-hidden px-6 pb-3">
            <a href='' className="flex flex-col">
                <img src={event} className="h-10 w-full object-contain"/>
                <p>Local Events</p>
            </a>
          </li>
          <li className="flex-shrink-0 bg-yellow-300 w-1/8 rounded-md text-center shadow-black hover:shadow-lg h-16 items-baseline align-middle overflow-hidden px-6 pb-3">
            <a href='' className="flex flex-col">
                <img src={seller} className="h-10 w-full object-contain"/>
                <p>Join as Seller</p>
            </a>
          </li>
        </ul>
        <div>
        </div>
    </nav>

  );
};

export default NavbarTwo;
