import React, { useState, useEffect } from 'react';

import Cookies from 'js-cookie';

const useUserAuthentication = () => {
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    const storedUserDetails = JSON.parse(Cookies.get("userDetails"));
    setUserDetails(storedUserDetails);
  }, []);
  return userDetails;
}

const NewProductCard = ({ newProduct }) => {
  const userDetails = useUserAuthentication();
  const { title, price, images } = newProduct;
  if (!newProduct) {
    return <div>Loading...</div>;
  }

  return (
    <div id='message-section' className="bg-white text-black border-slate-400 rounded-sm border hover:shadow-black hover:shadow-md object-contain">
    
      <div className="rounded-sm object-cover h-70 flex items-center p-2 justify-center">
        <img
          src={images[0]}
          alt={title}
          className="w-auto h-80 mb-4 md:py-4 px-2 aspect-square objcect-cover md:object-contain"
        />
    </div>
    <div className='flex flex-row items-center justify-between px-2'>
      <p className="relative text-gray-50 font-bold text-sm md:text-md bg-orange-500 rounded-sm px-1 md:px-4 py-1 w-fit">NEW ARRIVAL</p>
      <h4 className="text-green-600 font-semibold px-2 bg-white rounded-full border w-fit">
        <i className="fa-solid fa-star text-yellow-400 shadow-sm"></i> 5
      </h4>
    </div>
    
    <div className="flex flex-col mt-2 justify-center items-center object-cover w-full">
      {/* <a href={`/product/${productNumber}`} className='space-y-2 border-t px-2 w-full'> */}
        <h3 className="text-xl h-7 font-semibold overflow-hidden text-left">{title} </h3>
         
          <div className="flex flex-col space-y-5 items-center pb-2 justify-center">
              <div className='text-center justify-start w-full'>
                <h3 className="flex flex-row text-gray-950 font-thin text-4xl md:text-6xl"><span className='text-xl md:text-3xl'>$</span>{price}</h3>
              </div>
          </div>
          
      <div className="w-full flex flex-row justify-between text-white text-xl font-bold">
        {userDetails && (
          <button className="w-full bg-black border border-black rounded-b-sm shadow-black">
            <span className="font-semibold">
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