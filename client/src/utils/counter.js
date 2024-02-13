import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CounterButtons = ({ product }) => {
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState(null);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    const fetchCartItem = async () => {
      try {
      } catch (error) {
        console.error("Error fetching cart item", error);
      }
    };

    fetchCartItem();
  }, []);

  const handleAddToCart = async () => {
    try {
      setInCart(true);
      setQuantity(1);
    } catch (error) {
      console.error("Error adding product to cart", error);
      setError("An unexpected error occurred. Please try again.");
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
  const updateQuantity = () => {
    console.log(quantity);
  }

  return (
    <div className="h-12 flex flex-row text-black text-md font-semibold justify-between space-x-2 w-fit">
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : inCart ? (
        <div className="text-xl flex flex-row justify-evenly w-52 border-black border-2 bg-yellow-400 px-2 py-1 rounded-sm shadow-sm shadow-black">
          <button onClick={handleDecrement}>-</button>
          <span className='shadow-sm shadow-black items-center text-center h-8 w-8'>{quantity}</span>
          <button onClick={handleIncrement}>+</button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="bg-yellow-400 w-52 px-5 py-2 border-2 border-yellow-400 rounded-sm shadow-sm shadow-black"
        >
          ADD TO CART
        </button>
      )}

        <button 
          className='bg-orange-500 px-12 py-2 rounded-sm shadow-sm shadow-black'>
          <a href='linkToCheckOut'>BUY NOW</a>
        </button>
    </div>
  );
};

export default CounterButtons;
