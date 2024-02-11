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
      const response = await axios.get(`https://localhost:5000/user/${userId}/cart`);
      setUserCart(response.data);
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
  const productNumber = product.id;
  const handleAddToCart = async () => {
    try {
      console.log(productNumber);
      await axios.post(`https://localhost:5000/user/${userId}/cart/add/${productNumber}`);
      fetchUserCart();
      navigate(`/cart/${userId}`); 
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white border-white text-black rounded-sm border-2 hover:shadow-black hover:shadow-md lg:w-72">
      <div className="rounded-sm object-cover h-70 flex items-center p-2 justify-center">
        <img
          src={images[0]}
          alt={title}
          className="w-auto h-36 md:h-52 mb-4 md:py-4 px-2 aspect-square object-contain"
        />
      </div>
      <hr className='w-4/5 mx-7 border border-black' />
      <div className="flex flex-col md:space-y-2 mt-2">
        <h4 className="text-green-600 font-semibold px-2">
          <i className="fa-solid fa-star text-yellow-400 shadow-sm mr-2"></i>{rating}
        </h4>
        <div className="md:space-y-2 items-center flex flex-col pb-2 p-2 w-fit text-center lg:mx-8">
          <h3 className="md:text-xl h-6 font-semibold overflow-hidden"> {title} </h3>
          <p className="text-gray-950 md:font-semibold text-2xl">${price} /-</p>
          <p className="text-gray-50 md:font-bold text-lg bg-red-500 md:rounded-full px-2 md:px-4 py-1 w-fit md:w-44">{discountPercentage}% OFF</p>
        </div>
        <div className="flex flex-row w-9/10 justify-between">
          <button className="bg-green-600 text-white font-bold md:px-5 md:py-2 w-1/4 lg:text-lg text-sm rounded-sm shadow-sm shadow-black">
            <Link to={`/product/${productNumber}`} className="text-white hover:underline">
              <i className="fa fa-external-link" aria-hidden="true"></i>
            </Link>
          </button>
          {userDetails && (
            <button onClick={handleAddToCart} className="bg-yellow-400 text-black w-52 px-5 py-2 border-2 border-yellow-400 rounded-sm shadow-sm shadow-black">
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
