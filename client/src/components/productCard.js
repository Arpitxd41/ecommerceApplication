import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Check if product is undefined or null
  if (!product) {
    return <div>Loading...</div>; // or any other handling for undefined product
  }

  // Destructure product object
  const { id, images, title, discountPercentage, price, rating } = product;

  // Check which api is being used
  
    return (
      <div className="bg-white border-white text-black rounded-xl hover:shadow-2xl border-2 hover:border-black w-72">
        <div className="rounded-sm object-cover h-70 block items-center p-2">
          <img
            src={images[0]}
            alt={title}
            className="w-auto h-36 md:h-52 mb-4 md:py-4 px-2 aspect-square object-contain"
          />
        </div>
        <hr className='w-4/5 mx-7 border border-black' />
        <div className="flex flex-col md:space-y-2 mt-2">
            <h4 className="text-green-600 font-semibold px-2">{" "}
              <i className="fa-solid fa-star text-yellow-400 shadow-sm mr-2"></i>{rating}
            </h4>
          <div className="md:space-y-2 align-middle flex flex-col pb-2 p-2 w-fit text-center mx-8">
            <h3 className="md:text-xl h-6 font-semibold overflow-hidden"> {title} </h3>
            <p className="text-gray-950 md:font-semibold text-2xl">${price} /-</p>
            <p className="text-gray-50 md:font-bold text-lg bg-red-500 md:rounded-full px-2 md:px-4 py-1 w-fit md:w-44">{discountPercentage}% OFF</p>
          </div>
          <div className="flex flex-row w-9/10 justify-between">
            <button className="bg-black text-white font-bold md:px-5 md:py-2 w-1/4 md:text-lg text-sm border-gray-200 border rounded-bl-xl">
              <Link to={`/product/${id}`} className="text-white hover:underline">
                <i className="fa fa-external-link" aria-hidden="true"></i>
              </Link>
            </button>
            <button className="bg-yellow-400 text-black md:text-lg text-sm font-bold py-2 md:py-3 w-3/4 border border-gray-200 rounded-br-xl">
              <a href="{cart}" className="flex flex-row items-center justify-evenly md:px-4">
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                <p>ADD TO CART</p>  
              </a>
            </button>
          </div>
        </div>
      </div>
    );
  }
export default ProductCard;
