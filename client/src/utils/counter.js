import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CounterButtons = ({ product, userId }) => {
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState(null);
  const [inCart, setInCart] = useState(false);
  const productId = product._id;
  
  const navigate = useNavigate();
  // const SERVER = process.env.REACT_APP_DEVELOPMENT_SERVER;
  const SERVER = process.env.REACT_APP_PRODUCTION_SERVER;
  const dummyUser = process.env.REACT_APP_JOHN_DOE; 

  const handleAddToCart = async () => {
    try {
      if (userId === dummyUser.id) {
        navigate(`/login`);
      } else {
        setInCart(true);
        setQuantity(1);
      }
    } catch (error) {
      console.error("Error adding product to cart", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleBuyNow = async () => {
    try {
      if (userId === dummyUser.id) {
        navigate(`/login`);
      } else {
        await axios.post(`${SERVER}/user/cart/add/${userId}/${productId}`, { quantity });
        
        navigate(`/cart/${userId}`); 
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(quantity - 1, 0);
    setQuantity(newQuantity);
    if (newQuantity === 0) {
      setInCart(false);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="h-12 flex flex-row text-black text-sm md:text-md font-semibold justify-between space-x-2 w-full">
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : inCart ? (
        <div className="text-xl flex flex-row justify-evenly w-1/2 bg-yellow-400 px-2 py-1 rounded-sm shadow-sm shadow-black items-center">
          <button onClick={handleDecrement}>-</button>
          <span className='shadow-sm shadow-black items-center text-center h-8 text-xl w-8'>{quantity}</span>
          <button onClick={handleIncrement}>+</button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="bg-yellow-400 w-1/2 px-5 py-2 border-2 border-yellow-400 rounded-sm shadow-sm shadow-black"
        >
          BUY NOW
        </button>
      )}

      <button 
        onClick={handleBuyNow}
        className='w-1/2 text-md bg-orange-500 px-8 py-2 rounded-sm shadow-sm shadow-black'>
        ADD TO CART
      </button>
    </div>
  );
};

export default CounterButtons;
