import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const useUserAuthentication = () => {
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    setUserDetails(storedUserDetails);
  }, []);
  return userDetails;
}

const ProductCard = ({ product }) => {
  const userDetails = useUserAuthentication();
  const userId = userDetails._id;
  const [userCart, setUserCart] = useState(null);
  const navigate = useNavigate();
  const fetchUserCart = useCallback(async () => {
    try {
      const userCart = await axios.get(`https://localhost:5000/user/${userId}/cart`);
      console.log('userCart of fetchUserCart:', userCart.data)
      setUserCart(userCart.data);
    } catch (error) {
      console.error('Error fetching user cart:', error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUserCart();
    }
  }, [userId, fetchUserCart]);

  const { id, images, title, discountPercentage, price, rating } = product;
  const productNumber = id;
  console.log(images[0]);
  const handleAddToCart = async () => {
    try {
      // const quantity = 1;
      await axios.post(`https://localhost:5000/user/${userId}/cart/add/${productNumber}`, {quantity: 1});
      navigate(`/cart/${userId}`); 
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white border-white text-black rounded-sm border-2 hover:shadow-black hover:shadow-md md:w-72">
      <div className="rounded-sm object-cover h-70 flex items-center p-2 justify-center">
        <img
          src={images[0]}
          alt={title}
          className="w-auto h-36 md:h-52 mb-4 md:py-4 px-2 aspect-square object-contain"
        />
      </div>
      <hr className='w-4/5 mx-7 border border-black' />
      <div className="flex flex-col space-y-2 mt-2">
        <h4 className="text-green-600 font-semibold px-2">
          <i className="fa-solid fa-star text-yellow-400 shadow-sm mr-2"></i>{rating}
        </h4>
        <div className="w-fit flex flex-col space-y-2 items-center pb-2 text-center mx-10">
          <h3 className="text-xl h-6 font-semibold overflow-hidden"> {title} </h3>
          <p className="text-gray-950 font-semibold text-2xl">₹ {price} /-</p>
          <p className="text-gray-50 font-bold text-md bg-red-600 rounded-full px-4 py-1 w-32 md:w-44">{discountPercentage}% OFF</p>
        </div>
        <div className="flex flex-row w-9/10 justify-between text-white text-xl font-bold">
          <button className="w-1/4 bg-lime-600 border border-lime-600 rounded-sm shadow-sm shadow-black">
            <Link to={`/product/${productNumber}`} className="hover:underline">
              <i className="fa fa-external-link" aria-hidden="true"></i>
            </Link>
          </button>
          {userDetails && (
            <button onClick={handleAddToCart} className="w-52 bg-black border border-black rounded-sm shadow-sm shadow-black">
              <span className="font-semibold hover:underline">
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
