import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productImage from '../images/newProduct.png';

const useUserAuthentication = () => {
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    setUserDetails(storedUserDetails);
  }, []);
  return userDetails;
}

const NewProductCard = ({ newProduct }) => {
  const userDetails = useUserAuthentication();
  const { title, price, stock, brand, description } = newProduct;
  if (!newProduct) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white border-white text-black rounded-sm border-2 hover:shadow-black hover:shadow-md md:w-72">
      <div className="rounded-sm object-cover h-70 flex items-center p-2 justify-center">
        <img
          src={productImage}
          alt='titlepic'
          className="w-auto h-36 md:h-52 mb-4 md:py-4 px-2 aspect-square object-contain"
        />
      </div>
      <hr className='w-4/5 mx-7 border border-black' />
      <div className="flex flex-col space-y-2 mt-2">
        <h4 className="text-green-600 font-semibold px-2">
          <i className="fa-solid fa-star text-yellow-400 shadow-sm mr-2"></i> 5
        </h4>
        <div className="flex flex-col space-y-2 justify-center items-center pb-2 text-center mx-10">
          <h3 className="text-xl h-6 font-semibold overflow-hidden"> {title} </h3>
          <h3 className="text-xl h-6 font-semibold overflow-hidden"> {brand} </h3>
          <p className="text-gray-950 font-semibold text-2xl">₹ {price} /-</p>
          <p className="text-gray-950 font-semibold text-2xl">only {stock} left</p>
          <p className="text-gray-50 font-bold text-md bg-red-600 rounded-full px-4 py-1 w-32 md:w-44">{description}</p>
        </div>
        <div className="flex flex-row w-9/10 justify-between text-white text-xl font-bold">
          <button className="w-1/4 bg-lime-600 border border-lime-600 rounded-sm shadow-sm shadow-black">
            <Link className="hover:underline">
              <i className="fa fa-external-link" aria-hidden="true"></i>
            </Link>
          </button>
          {userDetails && (
            <button className="w-52 bg-black border border-black rounded-sm shadow-sm shadow-black">
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

export default NewProductCard;
