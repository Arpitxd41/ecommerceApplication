import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateToken } from '../utils/filter';
// import axios from 'axios';
import PayButton from '../components/paymentButton.js';

const CheckOut = () => {
  const [loading, setLoading] = useState(true);
  const [cartProducts, setCartProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [addressFormData, setAddressFormData] = useState({
    street: '',
    city: '',
    postalCode: '',
    phoneNumber: ''
  });
  const [userDetails, setUserDetails] = useState({});
  const [addressesList, setAddressesList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();

  const userId = userDetails._id;

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem('authToken');
      const storedUserDetails = localStorage.getItem('userDetails');

      if (!authToken) {
        navigate('/login');
        return;
      }

      const userDetails = JSON.parse(storedUserDetails);
      setUserDetails(userDetails);
      await fetchUserCart(userDetails._id, authToken);

      const isTokenValid = validateToken(authToken);
      if (!isTokenValid) {
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const productDetails = await Promise.all(
        selectedProducts.map(async (product) => {
          const response = await fetch(`https://dummyjson.com/products/${product.productNumber}`);
          if (response.ok) {
            const productData = await response.json();
            return { ...productData, quantity: product.quantity };
          }
          return null;
        })
      );
      setProductDetails(productDetails);
      // console.log('productDetails', productDetails);
    };

    if (selectedProducts.length > 0) {
      fetchProductDetails();
    }
  }, [selectedProducts]);

  useEffect(() => {
    const amount = productDetails.reduce((total, product) => total + (product.quantity * product.price), 0);
    setTotalAmount(amount);
  }, [productDetails]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch(`https://localhost:5000/getUser/${userDetails._id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        if (response.ok) {
          const userData = await response.json();
          const user = userData.user;
          if (user.address && user.address.length > 0) {
            const addressesList = user.address.map((address, index) => (
              <div className='bg-gray-100 border w-full flex flex-row py-2 rounded-sm px-4 shadow-inner items-center space-x-4' key={index} onClick={() => setSelectedAddress(address)}>
                <button className='hidden' type='checkbox'></button>
                <div className=''>
                  <p className='block'>{address.street},</p>
                  <p className='block'>{address.city}</p>
                  <p className='block'>{address.postalCode}</p>
                  <p className='block'>{address.phoneNumber}</p>
                </div>
              </div>
            ));
            setAddressesList(addressesList);
          } else {
            setAddressesList(<p>No addresses found. Please add a new address.</p>);
          }
        } else {
          console.error('Failed to fetch user data');
          setAddressesList(<p>Error fetching user data.</p>);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setAddressesList(<p>Error fetching user data.</p>);
      }
    };

    fetchAddresses();
  }, [userDetails._id]);

  const fetchUserCart = async (userId, authToken) => {
    try {
      const response = await fetch(`https://localhost:5000/user/${userId}/cart`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      if (response.ok) {
        const cartData = await response.json();
        const products = cartData.cartItems;
        const selectedProducts = products.filter(item => item.checked);
        setCartProducts(selectedProducts);
        setSelectedProducts(selectedProducts);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching cart data', error);
      setLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    setAddressFormData({
      ...addressFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('authToken');

    try {
      const response = await fetch(`https://localhost:5000/addAddress/${userDetails._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(addressFormData)
      });

      if (response.ok) {
        const userData = await response.json();
        setUserDetails(userData);
      }
    } catch (error) {
      console.error('Error adding address', error);
    }
  };

  return (
    <div className='px-4 py-6 shadow-xl shadow-black bg-gray-50'>
      <div className='flex flex-row justify-between bg-slate-900 p-5'>
        <Link className='bg-yellow-400 rounded-sm px-5 py-2 shadow-md font-semibold' to={`/cart/${userId}`}>
        <i className="fa fa-caret-left" aria-hidden="true"></i> BACK
        </Link>
        <PayButton userId={userId} totalAmount={totalAmount} selectedProducts={selectedProducts} selectedAddress={selectedAddress} />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='p-5'>
          <h4 className='text-xl font-semibold'>Products checking out:</h4>
          <div className='font-semibold'>
            <div className='border border-black grid grid-cols-4 p-2 text-xl'>
              <h3 className=''>Product</h3>
              <h3 className=''>Quantity</h3>
              <h3 className=''>Price/unit</h3>
              <h3 className=''>Total Price</h3>
            </div>
            {productDetails.map(product => (
              <div key={product.id}>
                <div className='border-black border-b w-full'>
                  <div className='grid grid-cols-4 justify-evenly p-2 pl-5'>
                    <div className='space-x-4 pl-4 flex flex-row'>
                      <img className='w-16' src={product.thumbnail} alt={product.title} />
                      <div>
                        <a href='#'>{product.title}</a>
                        <p className='text-orange-500'>{product.brand}</p>
                      </div>
                    </div>
                    <div className='pl-4'>{product.quantity}</div>
                    <div className='pl-4'>₹{product.price}/-</div>
                    <div className='pl-4'>₹{product.quantity * product.price}/-</div>
                  </div>
                </div>
              </div>
            ))}
            <div className='col-span-3'>
              <div className='border-black border-b w-full'>
                <div className='flex justify-end p-2'>
                  <div>Amount payable:</div>
                </div>
              </div>
            </div>
            <div className='col-span-1'>
              <div className='border-black border-b w-full'>
                <div className='flex justify-end p-2'>
                  <div className='text-3xl'>₹{totalAmount}/-</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='bg-gradient-to-tr from-gray-700 to-black p-5'>
        <h4 className='text-xl font-semibold text-white'>Confirm Address: Save the address to the address array in the user info</h4>
        <div className='flex flex-row'>
          <div className='w-2/3 float-left space-y-12'>
            <form className='grid grid-cols-2 gap-2 py-5' onSubmit={handleSubmit}>
              <input
                className='border-white rounded-sm shadow-sm shadow-black'
                type='text'
                name='street'
                placeholder='Address line 1'
                onChange={handleInputChange}
              />
              <input
                className='border-white rounded-sm shadow-sm shadow-black'
                type='text'
                name='city'
                placeholder='Address line 2'
                onChange={handleInputChange}
              />
              <input
                className='border-white rounded-sm shadow-sm shadow-black'
                type='number'
                name='postalCode'
                placeholder='Enter POSTAL CODE'
                onChange={handleInputChange}
              />
              <input
                className='border-white rounded-sm shadow-sm shadow-black'
                type='number'
                name='phoneNumber'
                placeholder='Enter Contact Number'
                onChange={handleInputChange}
              />
              <button className='col-span-2 bg-yellow-400 rounded-sm px-5 py-2 font-semibold shadow-sm shadow-black' type='submit'>SAVE</button>
            </form>
          </div>
          <div className='p-5 w-1/3 float-right items-center flex flex-col justify-center space-y-2'>
            <div className='w-full overflow-y-scroll h-40 bg-green-500 border border-black rounded-sm p-5 space-y-4'>{addressesList}</div>
            <div className='w-full h-40 bg-white p-5 rounded-sm'>{selectedAddress && (
              <div>
                <p>{selectedAddress.street},</p>
                <p>{selectedAddress.city}</p>
                <p>{selectedAddress.postalCode}</p>
                <p>{selectedAddress.phoneNumber}</p>
              </div>
            )}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
