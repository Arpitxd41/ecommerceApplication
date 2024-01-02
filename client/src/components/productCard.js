import React from "react";

const ProductCard = ({ product }) => {
  // Check if product is undefined or null
  if (!product) {
    return <div>Loading...</div>; // or any other handling for undefined product
  }

  // Destructure product object
  const { id, images, title, discountPercentage, price, rating } = product;

  // Check which api is being used
  
    return (
      <div className="bg-white text-black rounded-sm hover:shadow-lg">
        <div className="bg-white rounded-md object-cover h-70 block items-center">
          <img
            src={images[0]}
            alt={title}
            className="w-auto h-52 mb-4 py-4 px-2"
          />
        </div>
        <div className="flex flex-col space-y-2">
            <h4 className="text-green-600 font-semibold px-5">{" "}
              <i class="fa-solid fa-star text-yellow-400 shadow-sm"></i>{rating}
            </h4>
          <div className="space-y-2 text-center items-center align-middle flex flex-col justify-center p-2">
            <h3 className="text-xl h-6 font-semibold overflow-hidden"> {title} </h3>
            <p className="text-gray-950 font-semibold text-2xl">${price} /-</p>
            <p className="text-gray-50 font-bold text-lg bg-red-500 rounded-full px-4 py-1 w-44">{discountPercentage}% OFF</p>
          </div>
          <div className="flex flex-row w-9/10 justify-between">
            <button className="bg-black text-white font-bold px-5 py-2 w-1/4">
              <a href={`/product/${id}`} className="text-white hover:underline">
                <i class="fa fa-external-link" aria-hidden="true"></i>
              </a>
            </button>
            <button className="bg-green-500 text-white font-bold px-5 py-3 w-3/4">
              <a href="{cart}" className="flex flex-row items-center justify-evenly px-4">
                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                <p>ADD TO CART</p>  
              </a>
            </button>
          </div>
        </div>
      </div>
    );
  }
export default ProductCard;
