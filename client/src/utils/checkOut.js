import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CartButtons = ({ product }) => {
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState(null);
  const [inCart, setInCart] = useState(false); // New state to track if the product is in the cart

  useEffect(() => {
    // Check if the product is already in the cart
    const fetchCartItem = async () => {
      try {
        // Your code to fetch cart item from the server
        // Set inCart to true if the product is in the cart
        // Set the quantity from the fetched cart item
      } catch (error) {
        console.error("Error fetching cart item", error);
      }
    };

    fetchCartItem();
  }, []);

  const handleAddToCart = async () => {
    try {
      // Your code to add product to the cart
      // Set inCart to true and set the quantity to 1
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
          CHECKOUT
        </button>
      )}
    </div>
  );
};

export default CartButtons;
