import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CartButtons = ({ productNumber, userId, handleCheckboxChange }) => {
  const [quantity, setQuantity] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const fetchCartItem = async () => {
      try {
        const response = await axios.get(`https://localhost:5000/user/${userId}/cart/${productNumber}`);
        const cartItem = response.data;
        console.log('cartItem receivered =>', cartItem);
        const { quantity: fetchedQuantity, checked } = response.data;
        setQuantity(fetchedQuantity);
        setIsChecked(checked);
      } catch (error) {
        console.error("Error fetching cart item", error);
      }
    };

    fetchCartItem();
  }, [userId, productNumber]);

  const updateCartItem = async (newQuantity, checked) => {
    try {
      await axios.put(`https://localhost:5000/user/${userId}/cart/update/${productNumber}`, { quantity: newQuantity, checked });
      window.location.reload();
    } catch (error) {
      console.error("Error updating product quantity in cart", error);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCartItem(newQuantity, isChecked);
    }
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCartItem(newQuantity, isChecked);
  };

  const handleCheckboxChangeLocal = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    handleCheckboxChange(productNumber, checked);
    updateCartItem(quantity, checked);
  };

  return (
    <div className="h-12 flex flex-row text-md font-semibold justify-between space-x-2 w-fit px-8 items-center">
      <div className="items-center text-xl flex flex-row justify-evenly w-52 bg-yellow-400 text-black px-2 py-2 rounded-sm shadow-xs shadow-black">
        <button onClick={handleDecrement}>-</button>
        <span className='text-center h-8 w-8'>{quantity}</span>
        <button onClick={handleIncrement}>+</button>
      </div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChangeLocal}
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
