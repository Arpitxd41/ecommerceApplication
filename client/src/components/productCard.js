import React from "react";

const ProductCard = ({ product }) => {
  // Check if product is undefined or null
  if (!product) {
    return <div>Loading...</div>; // or any other handling for undefined product
  }

  // Destructure product object
  const { image, title, price, id } = product;

  return (
    <div className="text-gray-600 p-4 rounded-sm hover:shadow-lg bg-white space-y-12">
        <div className="object-cover h-70 block items-center">
            <img src={image} alt={title} className="w-auto h-64 mb-4 py-4 px-2" />       
        </div>
        <div className="h-24 border-2 border-red-500">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-700">${price}</p>
        </div>
        <div className="flex flex-row w-9/10 justify-between">
            <button className="bg-blue-500 text-white font-bold rounded-md px-5 py-2 w-1/3">
            <a href={`/product/${id}`} className="text-white hover:underline">
                <i class="fa fa-external-link" aria-hidden="true"></i>
            </a>
            </button>
            <button className="bg-yellow-400 text-white font-bold rounded-md px-5 py-2 w-7/12">
                <a href="{cart}">
                    ADD TO CART
                </a>
            </button>
      </div>
    </div>
  );
};

export default ProductCard;
