import React, { useState, useEffect } from 'react';

const StickyFooter = ({ cartProducts }) => {
  const [productCount, setProductCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Calculate product count and total price based on cartProducts
    let count = 0;
    let price = 0;
    cartProducts.forEach((item) => {
      count += item.quantity;
      price += item.price * item.quantity;
    });
    setProductCount(count);
    setTotalPrice(price);
  }, [cartProducts]);

  const handleCheckboxChange = (checked) => {
    setIsChecked(checked);
    if (checked) {
      setProductCount(productCount + 1);
    } else {
      setProductCount(Math.max(productCount - 1, 0));
    }
  };

  const handleCheckout = () => {
    // Handle checkout button click event
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-green-600 shadow-md shadow-black py-4 px-8 flex justify-between items-center text-white text-lg font-semibold">
      <div className="flex items-center">
        <span className="mr-2">Product to checkout : {productCount}</span>
        <span>Total Price: ${totalPrice.toFixed(2)}</span>
      </div>
      <div className="mr-2 flex flex-row items-center w-1/5">
            <div className="mr-2">
                  <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="mr-2 h-5 w-5 border-2 rounded-sm bg-gray-100 appearance-none select-none"
                  />
                  <span className="ml-1">Select All</span>
            </div>
      </div>
      <button
        onClick={handleCheckout}
        className="text-md text-black bg-yellow-400 px-5 py-2 border-2 border-yellow-400 rounded-sm shadow-sm shadow-black"
      >
        CHECKOUT
      </button>
    </div>
  );
};

export default StickyFooter;
