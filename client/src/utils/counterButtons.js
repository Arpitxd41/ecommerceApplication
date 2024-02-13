import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CartButtons = ({ productNumber, userId }) => {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [inCart, setInCart] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

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
      await axios.post(`https://localhost:5000/user/${userId}/cart/update/${productNumber}`, { quantity })
      setInCart(true);
      console.log(quantity);
      console.log('Product ID:', productNumber);
      console.log('User ID:', userId);
    } catch (error) {
      console.error("Error adding product to cart", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="h-12 flex flex-row text-md font-semibold justify-between space-x-2 w-fit px-8 items-center">
      <div className="items-center text-xl flex flex-row justify-evenly w-52 bg-yellow-400 text-black px-2 py-2 rounded-sm shadow-xs shadow-black">
        <button onClick={handleDecrement}>-</button>
        <span onChange={handleAddToCart} className='text-center h-8 w-8'>{quantity}</span>
        <button onClick={handleIncrement}>+</button>
      </div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="mx-2 h-5 w-5 border-2 border-black rounded-sm bg-gray-100"
      />
      <button
        className={`bg-blue-500 text-xl w-52 px-5 py-2 border-2 border-blue-500 text-white rounded-sm shadow-sm shadow-black ${
          !isChecked ? 'cursor-not-allowed opacity-50' : ''
        }`}
        disabled={!isChecked}
      >
        CHECKOUT
      </button>
    </div>
  );
};

export default CartButtons;
