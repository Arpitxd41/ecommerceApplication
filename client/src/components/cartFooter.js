import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StickyFooter = ({ cartProducts, setCartProducts, userDetails }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectAllChecked, setSelectAllChecked] = useState(
    localStorage.getItem('selectAllChecked') === 'true'
  );
  const userId = userDetails._id;
  const navigate = useNavigate();

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
  }, [cartProducts]);

  useEffect(() => {
    localStorage.setItem('selectAllChecked', selectAllChecked.toString());
  }, [selectAllChecked]);

  const handleCheckboxChange = (productNumber, checked) => {
    const updatedCartProducts = cartProducts.map(product =>
      product.productNumber === productNumber ? { ...product, checked } : product
    );

    setCartProducts(updatedCartProducts);
  };

  const handleSelectAll = () => {
    const newSelectAllChecked = !selectAllChecked;
    setSelectAllChecked(newSelectAllChecked);

    const updatedCartProducts = cartProducts.map(product => ({
      ...product,
      checked: newSelectAllChecked
    }));

    setCartProducts(updatedCartProducts);

    // If "Select All" is being unchecked, uncheck individual product checkboxes
    if (!newSelectAllChecked) {
      const updatedCartProductsUncheckAll = updatedCartProducts.map(product => ({
        ...product,
        checked: false
      }));
      setCartProducts(updatedCartProductsUncheckAll);
      updatedCartProductsUncheckAll.forEach(product => {
        handleCheckboxChange(product.productNumber, false);
      });
    }

    // Send updated cart data to the server
    fetch(`https://localhost:5000/user/${userId}/cart/selectAll`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ selectAll: newSelectAllChecked })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update cart data');
        }
        window.location.reload();
      })
      .catch(error => {
        console.error('Error updating cart data:', error);
      });
  };

  const handleCheckout = () => {
    navigate(`/checkout/${userId}`);
  }

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-slate-950 shadow-md shadow-black py-4 px-8 flex justify-between items-center text-white text-lg font-semibold">
      <div className="flex items-center">
        <span>Total Price: ₹ {totalPrice.toFixed(2)}</span>
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
        className="text-md text-black bg-red-600 px-5 py-2 border-2 font-semibold border-red-600 rounded-sm shadow-sm shadow-black"
      >
        <i className="fa fa-trash mr-2" aria-hidden="true"></i>
        CLEAR ALL
      </button>
      <button
        onClick={handleCheckout}
        className="text-md text-black bg-yellow-400 px-5 py-2 border-2 border-yellow-400 rounded-sm shadow-sm shadow-black"
      >
        CHECKOUT
        <i className="fa fa-caret-right" aria-hidden="true"></i>

      </button>
    </div>
  );
};

export default StickyFooter;
