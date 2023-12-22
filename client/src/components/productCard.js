import React from "react";

const ProductCard = ({ product }) => {
  // Check if product is undefined or null
  if (!product) {
    return <div>Loading...</div>; // or any other handling for undefined product
  }

  // Destructure product object
  const { id, image, title, price, rating } = product;

  // Check which api is being used
  if ("image" in product) {
    // Product with 'image'
    const { image, rating } = product;
    const rate = rating.rate;
    return (
      <div className="bg-gray-200 border-2 border-black text-black rounded-md hover:shadow-lg space-y-2">
        <div className="bg-white rounded-md p-4 object-cover h-70 block items-center">
          <img
            src={image}
            alt={title}
            className="w-auto h-64 mb-4 py-4 px-2"
          />
        </div>
        <div className="flex flex-col space-y-5 p-2">
          <div className="">
            <h4 className="items-center space-x-2 text-green-600 font-semibold">
              {" "}
              <i class="fa-solid fa-star text-yellow-400"></i> {rate}
            </h4>
            <h3 className="text-md font-semibold mb-2 h-12 overflow-hidden">
              {title}
            </h3>
            <p className="text-gray-800 font-semibold text-2xl">${price} /-</p>
          </div>
          <div className="flex flex-row w-9/10 justify-between">
            <button className="border-2 border-black bg-black text-white font-bold rounded-s-md px-5 py-2 w-1/4">
              <a
                href={`/product/${id}`}
                className="text-white hover:underline">
                <i
                  class="fa fa-external-link"
                  aria-hidden="true"></i>
              </a>
            </button>
            <button className="border-2 border-black bg-yellow-400 text-black font-bold rounded-e-md px-5 py-2 w-3/4">
              <a href="{cart}">ADD TO CART</a>
            </button>
          </div>
        </div>
      </div>
    );
  } else if ("images" in product) {
    const { images, rating } = product;
    return (
      <div className="bg-gray-200 border-2 border-black text-black rounded-md hover:shadow-lg space-y-2">
        <div className="bg-white rounded-md p-4 object-cover h-70 block items-center">
          <img
            src={images[0]}
            alt={title}
            className="w-auto h-64 mb-4 py-4 px-2"
          />
        </div>
        <div className="flex flex-col space-y-5 p-2">
          <div className="">
            <h4 className="text-green-600 font-semibold">
              {" "}
              <i class="fa-solid fa-star text-yellow-400"></i> {rating}
            </h4>
            <h3 className="text-md font-semibold mb-2 h-12 overflow-hidden">
              {title}
            </h3>
            <p className="text-gray-800 font-semibold text-2xl">${price} /-</p>
          </div>
          <div className="flex flex-row w-9/10 justify-between">
            <button className="border-2 border-black bg-black text-white font-bold rounded-s-md px-5 py-2 w-1/4">
              <a
                href={`/product/${id}`}
                className="text-white hover:underline">
                <i
                  class="fa fa-external-link"
                  aria-hidden="true"></i>
              </a>
            </button>
            <button className="border-2 border-black bg-yellow-400 text-black font-bold rounded-e-md px-5 py-2 w-3/4">
              <a href="{cart}">ADD TO CART</a>
            </button>
          </div>
        </div>
      </div>
    );
  }
};
export default ProductCard;
