import React, { useState, useEffect, useCallback } from 'react';
import { Link, redirect } from 'react-router-dom';
import axios from 'axios';

const ProductCard = ({ product, userDetails }) => {
  const userId = userDetails._id;
  const [userCart, setUserCart] = useState(null);
  const [message, setMessage] = useState('');
  const fetchUserCart = useCallback(async () => {

    try {
      setUserCart(userCart);
    } catch (error) {
      console.error('Error fetching user cart:', error);
    }
  }, [ userCart]);

  useEffect(() => {
    if (userId) {
      fetchUserCart();
    }
  }, [userId, fetchUserCart]);

  const { _id, images, title, discountPercentage, price, rating } = product;
  const productId = _id;
  
  // const SERVER = process.env.REACT_APP_DEVELOPMENT_SERVER;
  const SERVER = process.env.REACT_APP_PRODUCTION_SERVER;
  const handleAddToCart = async (e) => {

    if(!userId || userId === undefined) {
      redirect('/login');
    }
    try {
      await axios.post(`${SERVER}/user/cart/add/${userId}/${productId}`, {quantity: 1});
      setMessage(`${title} added to cart`);
      setTimeout(() => {
        setMessage('');
      }, 3000);
      
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div id='message-section' className="bg-white text-black border-slate-400 rounded-sm border hover:shadow-black hover:shadow-md object-contain">
      <Link to={`/product/${productId}`} className='space-y-2'>
        <div className="rounded-sm object-cover h-70 flex items-center p-2 justify-center">
          <img
            src={images[0]}
            alt={title}
            className="w-auto h-36 md:h-52 mb-4 md:py-4 px-2 aspect-square objcect-cover md:object-contain"
          />
      </div>
      <div className='flex flex-row items-center justify-between px-2'>
        <p className="relative text-gray-50 font-bold text-sm md:text-md bg-orange-500 rounded-sm px-1 md:px-4 py-1 w-fit">{discountPercentage}% OFF</p>
        <h4 className="text-green-600 font-semibold px-2 bg-white rounded-full border w-fit">
          <i className="fa-solid fa-star text-yellow-400 shadow-sm"></i>{rating}
        </h4>
      </div>
      </Link>
      <div className="flex flex-col mt-2 justify-center items-center object-cover w-full">
        <Link to={`/product/${productId}`} className='space-y-2 border-t px-2 w-full'>
          <h3 className="text-xl h-7 font-semibold overflow-hidden text-left">{title} </h3>
           {message && 
            <div className='left-0 w-full absolute bg-black text-white font-bold px-6 py-4 text-2xl text-center'>
              {message}
            </div>
            }
            <div className="flex flex-col space-y-5 items-center pb-2 justify-center">
                <div className='text-center justify-start items-center w-full'>
                  <h3 className="flex flex-row items-center text-gray-950 font-thin text-2xl md:text-4xl lg:text-5xl"><span className='text-xl md:text-3xl'>₹</span>{price}/-</h3>
                </div>
            </div>
        </Link>
        <div className="w-full flex flex-row justify-between text-white text-xl font-bold">
          {userDetails && (
            <button onClick={handleAddToCart} className="w-full bg-black border border-black rounded-b-sm shadow-black">
              <span className="font-semibold">
                ADD TO CART
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
