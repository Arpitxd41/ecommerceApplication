import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StickyFooter = ({ cartProducts, setCartProducts, userDetails }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectAllChecked, setSelectAllChecked] = useState(
    localStorage.getItem('selectAllChecked') === 'true'
  );
  const userId = userDetails._id;
  const navigate = useNavigate();
  const userCart = process.env.REACT_APP_USER_CART;

  useEffect(() => {
    let price = 0;
    const selectedProducts = cartProducts.filter(product => product.checked);
    Promise.all(selectedProducts.map(async (product) => {
      try {
        const dummyProducts = process.env.REACT_APP_PRODUCTS;
        const response = await fetch(`${dummyProducts}/${product.productNumber}`);
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

    fetch(`${userCart}/selectall/${userId}`, {
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

  const handleClearAll = () => {
    fetch(`${userCart}/remove/${userId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          setCartProducts([]); // Clear the cartProducts state
          console.log('All products removed from the cart');
        } else {
          console.error('Failed to remove products from the cart');
        }
      })
      .catch(error => {
        console.error('Error removing products from the cart:', error);
      });
  };


  const handleCheckout = () => {
    navigate(`/checkout/${userId}`);
  }

  return (
    <div className="text-sm md:text-lg sticky bottom-0 left-0 right-0 bg-slate-950 shadow-md shadow-black py-2 px-2 md:px-8 flex justify-between items-center text-white font-semibold">
      <div className="w-1/4 md:w-1/5 flex items-center">
        <span className='text-lg'>$ {totalPrice.toFixed(2)}</span>
      </div>
      <div className="w-1/5 hidden md:flex flex-row items-center">
        <div className="flex flex-row items-center">
          <input
            type="checkbox"
            checked={selectAllChecked}
            onChange={handleSelectAll}
            className="h-5 w-5 border-2 rounded-sm bg-gray-100 appearance-none select-none"
          />
          <span className="text-sm md:text-lg">Select All</span>
        </div>
      </div>
      <button
        onClick={handleClearAll}
        className="w-1/3 md:w-1/5 text-black bg-red-600 px-2 md:px-5 py-2 border-2 font-semibold border-red-600 rounded-sm shadow-sm shadow-black"
      >
        <i className="fa fa-trash mr-2" aria-hidden="true"></i>
        CLEAR ALL
      </button>
      <button onClick={handleCheckout}
        className="w-1/3 md:w-1/5 text-black bg-yellow-400 px-2 md:px-5 py-2 border-2 font-semibold border-yellow-400 rounded-sm shadow-sm shadow-black">
        CHECKOUT
        <i className="fa fa-caret-right" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default StickyFooter;
