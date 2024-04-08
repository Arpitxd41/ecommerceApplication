import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CounterButtons = ({ product, userId }) => {
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState(null);
  const [inCart, setInCart] = useState(false);
  const productNumber = product.id;
  const navigate = useNavigate();
  const cartHead = process.env.REACT_APP_USER_CART;

  const handleAddToCart = async () => {
    try {
      setInCart(true);
      setQuantity(1);
    } catch (error) {
      console.error("Error adding product to cart", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleBuyNow = async () => {
    try {
      // Make request to add product to cart
      console.log('productNumber-------', productNumber);
      await axios.post(`${cartHead}/add/${userId}/${productNumber}`, { quantity });
      // Redirect to cart page
      navigate(`/cart/${userId}`); 
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
    <div className="h-12 flex flex-row text-black text-md font-semibold justify-between space-x-2 w-fit">
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : inCart ? (
        <div className="text-xl flex flex-row justify-evenly w-52 border-black border-2 bg-yellow-400 px-2 py-1 rounded-sm shadow-sm shadow-black items-center">
          <button onClick={handleDecrement}>-</button>
          <span className='shadow-sm shadow-black items-center text-center h-8 text-xl w-8'>{quantity}</span>
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
        onClick={handleBuyNow}
        className='w-44 text-md bg-orange-500 px-8 py-2 rounded-sm shadow-sm shadow-black'>
        BUY NOW
      </button>
    </div>
  );
};

export default CounterButtons;
