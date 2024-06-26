import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateToken } from '../../utils/filter.js';
import Cookies from 'js-cookie';
import axios from 'axios';
import PayButton from '../../components/paymentButton.js';
import shopperbg from '../../images/shopperbg2.png';

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

  // const SERVER = process.env.REACT_APP_DEVELOPMENT_SERVER;
  const SERVER = process.env.REACT_APP_PRODUCTION_SERVER;

  useEffect(() => {
    const fetchData = async () => {
      const authToken = Cookies.get('authToken');
      const storedUserDetails = Cookies.get('userDetails');

      if (!authToken) {
        navigate('/login');
        return;
      }

      if (!storedUserDetails) {
        console.error('User details not found in cookies.');
        return;
      }

      const userDetails = JSON.parse(storedUserDetails);
      setUserDetails(userDetails);

      const userId = userDetails._id;
      
      const isTokenValid = validateToken(authToken);
      if (!isTokenValid) {
        navigate('/login');
        return;
      }

      await fetchUserCart(userId, authToken);
      await fetchAddresses(userId, authToken);
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (selectedProducts.length === 0) return;

      const productDetails = await Promise.all(
        selectedProducts.map(async (product) => {
          try {
            const response = await axios.get(`${SERVER}/product/${product.productId}`);
            
            const productData = response.data.product;
            
            return { ...productData, quantity: product.quantity };
          } catch (error) {
            console.error(`Error fetching product ${product.productId}:`, error);
            return null;
          }
        })
      );
      setProductDetails(productDetails.filter(Boolean)); // Filter out any null values
    };

    fetchProductDetails();
  }, [selectedProducts]);

  useEffect(() => {
    const amount = productDetails.reduce((total, product) => total + (product.quantity * product.price), 0);
    setTotalAmount(amount);
  }, [productDetails]);

  const fetchUserCart = async (userId, authToken) => {
    try {
      const response = await axios.get(`${SERVER}/user/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      const cartData = response.data;
      const products = cartData.cartItems;

      const updatedProducts = await Promise.all(products.map(async (product) => {
        try {
          const productResponse = await axios.get(`${SERVER}/product/${product.productId}`);
          const productData = productResponse.data.product;

          return { ...product, category: productData.category, brand: productData.brand };
        } catch (error) {
          console.error(`Error fetching product ${product.productId}:`, error);
          return null;
        }
      }));
      
      const selectedProducts = updatedProducts.filter(item => item.checked);
      setCartProducts(selectedProducts);
      setSelectedProducts(selectedProducts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart data', error);
      setLoading(false);
    }
  };

  const fetchAddresses = async (userId, authToken) => {
    try {
      const response = await axios.get(`${SERVER}/getuser/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      const userData = response.data;
      const user = userData.user;

      if (user.address && user.address.length > 0) {
        const addressesList = user.address.map((address, index) => (
          <div className='bg-gray-100 w-full flex flex-row py-2 rounded-sm px-2 drop-shadow-md shadow-black shadow-inner items-center font-semibold' key={index} onClick={() => setSelectedAddress(address)}>
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
    } catch (error) {
      console.error('Addresses not available at this moment:', error);
      setAddressesList(<p>Error fetching user data.</p>);
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
    const authToken = Cookies.get('authToken');
    const userId = userDetails._id;

    try {
      const response = await axios.put(`${SERVER}/add_address/${userId}`, addressFormData, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      if (response.status === 201) {
        const userData = response.data;
        setUserDetails(userData);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error adding address', error);
    }
  };

  return (
    <div className='p-5 shadow-xl shadow-black bg-center bg-no-repeat bg-cover font-bold bg-fixed' style={{ backgroundImage: `url(${shopperbg})` }}>
      <div className='flex flex-row justify-between bg-slate-900 p-5'>
        <Link className='bg-yellow-400 rounded-sm px-5 py-2 shadow-md font-semibold' to={`/cart/${userDetails._id}`}>
          <i className="fa fa-caret-left" aria-hidden="true"></i> BACK
        </Link>
        <PayButton userId={userDetails._id} totalAmount={totalAmount} selectedProducts={selectedProducts} selectedAddress={selectedAddress} />
      </div>
      <div className='h-auto'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='p-5'>
          <h4 className='text-xl font-semibold'>Products checking out:</h4>
          <div className='font-semibold'>
            <div className='bg-blue-600 text-white rounded-sm grid grid-cols-5 p-2 text-md md:font-semibold font-bold md:text-xl gap-4'>
              <h3 className='col-span-2'>Product</h3>
              <h3 className=''>Quantity</h3>
              <h3 className=''>Price/unit</h3>
              <h3 className=''>Price</h3>
            </div>
            {productDetails.map(product => (
              <div key={product.id}>
                <div className='border-black border-b w-full'>
                  <div className='grid grid-cols-5 justify-between md:justify-evenly p-2'>
                    <div className='md:space-x-2 flex md:flex-row col-span-2'>
                      <img className='md:flex hidden h-20 w-20 border' src={product.images[0]} alt={product.title} />
                      <div>
                        <h4>{product.title}</h4>
                        <p className='text-orange-500'>{product.brand}</p>
                        <p className='text-slate-500'>({product.category})</p>
                      </div>
                    </div>
                    <div className='pl-4'>{product.quantity}</div>
                    <div className='pl-4'><i className="fa fa-inr" aria-hidden="true"></i> {product.price}/-</div>
                    <div className='pl-4'><i className="fa fa-inr" aria-hidden="true"></i> {product.quantity * product.price}/-</div>
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
                  <div className='text-3xl'><i className="fa fa-inr" aria-hidden="true"></i> {totalAmount}/-</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
      <div className='bg-gradient-to-tr from-gray-700 to-black p-5'>
        <h5 className='text-white font-bold text-lg'>Selected Address :</h5>
        <div className='w-full h-auto bg-white drop-shadow-lg shadow-inner shadow-black p-5 rounded-sm text-black font-semibold'>
          {selectedAddress && (
            <div className='flex flex-col md:flex-row md:space-x-4'>
              <p>{selectedAddress.street},</p>
              <p>{selectedAddress.city} ({selectedAddress.postalCode})</p>
              <p>Contact : {selectedAddress.phoneNumber}</p>
            </div>
          )}
        </div>
        <br />
        <h4 className='text-xl font-semibold text-white'>Add a New Address</h4>
        <div className='flex flex-col-reverse md:flex-row'>
          <div className='md:w-2/3 md:float-left space-y-12'>
            <form className='flex justify-center flex-col md:grid grid-cols-2 gap-2 py-5' onSubmit={handleSubmit}>
              <input
                required
                className='border-white rounded-sm shadow-sm shadow-black'
                type='text'
                name='street'
                placeholder='Address line 1'
                onChange={handleInputChange}
              />
              <input
                required
                className='border-white rounded-sm shadow-sm shadow-black'
                type='text'
                name='city'
                placeholder='Address line 2'
                onChange={handleInputChange}
              />
              <input
                required
                className='border-white rounded-sm shadow-sm shadow-black'
                type='number'
                name='postalCode'
                placeholder='Enter POSTAL CODE'
                onChange={handleInputChange}
              />
              <input
                required
                className='border-white rounded-sm shadow-sm shadow-black'
                type='number'
                name='phoneNumber'
                placeholder='Enter Contact Number'
                onChange={handleInputChange}
              />
              <div className='col-span-2 flex justify-center px-2 text-white'>
                <button className='w-2/5 md:w-full bg-blue-400 rounded-sm px-5 py-2 font-semibold shadow-sm shadow-black' type='submit'>SAVE</button>
              </div>
            </form>
          </div>
          <div className='p-5 md:w-1/3 md:float-right items-center flex flex-col justify-center space-y-2'>
            <div className='w-full overflow-y-scroll h-44 bg-red-500 border border-black rounded-sm px-5 py-2 space-y-2 my-2'>
              <p className='text-white font-bold text-sm'><i className="fa fa-map-marker" aria-hidden="true"></i> Tap on address to select</p>
              {addressesList}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
