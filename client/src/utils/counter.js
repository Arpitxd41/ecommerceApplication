import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateToken} from './filter';
import axios from 'axios';

const useUserAuthentication = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));

    if (!authToken || !validateToken(authToken) || !storedUserDetails) {
      navigate('/login');
    }

    setUserDetails(storedUserDetails);
  }, [navigate]);

  return userDetails;
};

const CounterButtons = ({ productId }) => {
  const [quantity, setQuantity] = useState(0);
  const [showCounter, setShowCounter] = useState(false);
  const [error, setError] = useState(null);
  const userDetails = useUserAuthentication();
  const fetchCartItem = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const userId = userDetails._id;

      const response = await axios.get(`/user/${userId}/cart`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        const updatedCartItem = response.data;
        setQuantity(updatedCartItem.quantity);
        setShowCounter(true);
      }
    } catch (error) {
      console.error("Error fetching CART ITEM", error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const userId = userDetails._id;

      if (!userId) {
        console.error("User ID is undefined");
        return;
      }

      const response = await axios.post(`/user/${userId}/cart/add/${productId}`, {
        product: {
          productId: productId,
          quantity: 1,
        },
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      
      console.log(response);

      if (response.status === 200) {
        const updatedProduct = response.data;
        setQuantity(updatedProduct.quantity);
        setShowCounter(true);
      } else {
        console.error("Failed to add the product to cart. Response:", response.status, response.statusText);
        setError("Failed to add the product to cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product to the cart", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleIncrement = async () => {
    setQuantity(quantity + 1);
    await updateCartItemQuantity(quantity + 1);
  };

  const handleDecrement = async () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      await updateCartItemQuantity(newQuantity);
    }

    if (quantity === 1) {
      setShowCounter(false);
    }
  };

  const updateCartItemQuantity = async (newQuantity) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const userId = userDetails._id;

      if (!userId) {
        console.error("User ID is undefined");
        return;
      }

      const response = await axios.patch(`/user/${userId}/cart/add/${productId}`, {
        product: {
          productId: productId,
          quantity: newQuantity,
        },
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        const updatedProduct = response.data;
        setQuantity(updatedProduct.quantity);
      } else {
        console.error("Failed to update cart item quantity. Response:", response.status, response.statusText);
        setError("Failed to update cart item quantity. Please try again.");
      }
    } catch (error) {
      console.error("Error updating cart item quantity", error);
    }
  };
  useEffect(() => {
    if (showCounter) {
      fetchCartItem();
    }
  }, [showCounter]);

  return (
    <div className="flex flex-row text-black text-md font-semibold justify-between space-x-2 w-fit">
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : showCounter ? (
        <div className="text-xl flex flex-row justify-evenly w-52 border-black border-2 bg-yellow-400 px-2 py-1 rounded-sm shadow-sm shadow-black">
          <button onClick={handleDecrement}>-</button>
          <span>{quantity}</span>
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
    </div>
  );
};

export default CounterButtons;
