import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const StickyFooter = ({ cartProducts, setCartProducts, userDetails }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectAllChecked, setSelectAllChecked] = useState(
    Cookies.get('selectAllChecked') === 'true'
  );
  
  const userId = userDetails._id;
  const navigate = useNavigate();
  const SERVER = process.env.REACT_APP_DEVELOPMENT_SERVER;
  // const SERVER = process.env.REACT_APP_PRODUCTION_SERVER;

  useEffect(() => {
    let price = 0;
    const selectedProducts = cartProducts.filter(product => product.checked);
    Promise.all(selectedProducts.map(async (product) => {
      try {
        const response = await axios.get(`${SERVER}/product/${product.productId}`);
        const productDetails = response.data.product;
        price += productDetails.price * product.quantity;
      } catch (error) {
        console.error('Error fetching product price:', error);
      }
    })).then(() => {
      setTotalPrice(price);
    });
  }, [cartProducts, SERVER]);  

  useEffect(() => {
    Cookies.set('selectAllChecked', selectAllChecked.toString(), { expires: 1 });
  }, [selectAllChecked]);

  const handleCheckboxChange = (productId, checked) => {
    const updatedCartProducts = cartProducts.map(product =>
      product.productId === productId ? { ...product, checked } : product
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
        handleCheckboxChange(product.productId, false);
      });
    }

    fetch(`${SERVER}/user/cart/selectall/${userId}`, {
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
    fetch(`${SERVER}/user/cart/remove/${userId}`, {
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
    <div className="text-sm md:text-lg sticky bottom-0 left-0 right-0 bg-slate-950 shadow-md shadow-black py-2 px-2 lg:px-8 flex justify-between items-center text-white font-semibold">
      <div className="w-1/3 md:w-1/4 lg:w-1/5 flex items-center">
        <span className='text-xl md:text-2xl font-thin'>₹{totalPrice}/-</span>
      </div>
      <div className="w-1/3 md:w-1/4 lg:w-1/5 hidden md:flex flex-row items-center">
        <div className="flex flex-row items-center">
          <input
            type="checkbox"
            checked={selectAllChecked}
            onChange={handleSelectAll}
            className="h-6 w-6 border-2 rounded-full bg-gray-100 appearance-none select-none"
          />
          <span className="text-sm md:text-lg">Select All</span>
        </div>
      </div>
      <button onClick={handleClearAll} className="w-1/3 md:w-1/4 lg:w-1/5 text-gray-200 bg-red-600 px-2 md:px-5 py-2 font-semibold rounded-l-sm" >
        <i className="fa fa-trash mr-2" aria-hidden="true"></i>
        CLEAR ALL
      </button>
      <button onClick={handleCheckout} className="w-1/3 md:w-1/4 lg:w-1/5 text-black bg-yellow-400 px-2 md:px-5 py-2 font-semibold rounded-r-sm">
        CHECKOUT
        <i className="fa fa-caret-right" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default StickyFooter;
