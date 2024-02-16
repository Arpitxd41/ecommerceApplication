import React, { useState, useEffect } from 'react';

const StickyFooter = ({ cartProducts, setCartProducts, userDetails }) => {
  const [totalPrice, setTotalPrice] = useState(0); // Include totalPrice state
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  useEffect(() => {
    let price = 0;

    const selectedProducts = cartProducts.filter(product => product.checked);

    Promise.all(selectedProducts.map(async (product) => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${product.productNumber}`);
        const productDetails = await response.json();
        price += productDetails.price * product.quantity;
      } catch (error) {
        console.error('Error fetching product price:', error);
      }
    })).then(() => {
      setTotalPrice(price);
    });
    if (selectAllChecked) {
      window.location.reload();
    }
  }, [cartProducts, selectAllChecked]);

  const handleCheckboxChange = (productNumber, checked) => {
    const updatedCartProducts = cartProducts.map(product =>
      product.productNumber === productNumber ? { ...product, checked } : product
    );

    setCartProducts(updatedCartProducts);
  };

  const handleSelectAll = () => {
    setSelectAllChecked(!selectAllChecked);
    const updatedCartProducts = cartProducts.map(product =>
      ({ ...product, checked: !selectAllChecked })
    );

    setCartProducts(updatedCartProducts);
    fetch(`https://localhost:5000/user/${userDetails._id}/cart/selectAll`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedCartProducts)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update cart data');
      }
      // Optionally, perform any actions after successful update
    })
    .catch(error => {
      console.error('Error updating cart data:', error);
    });
  };

  const handleCheckout = () => {
    // Handle checkout button click event
  };


  return (
    <div className="sticky bottom-0 left-0 right-0 bg-green-600 shadow-md shadow-black py-4 px-8 flex justify-between items-center text-white text-lg font-semibold">
      <div className="flex items-center">
        <span>Total Price: ${totalPrice.toFixed(2)}</span>
      </div>
      <div className="mr-2 flex flex-row items-center w-1/5">
        <div className="mr-2">
          <input
            type="checkbox"
            checked={selectAllChecked}
            onChange={handleSelectAll}
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
