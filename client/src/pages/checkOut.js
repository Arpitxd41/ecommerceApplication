import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateToken } from '../utils/filter';
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
  const server = process.env.REACT_APP_SERVER;
  const cartHead = process.env.REACT_APP_USER_CART;
  const dummyProduct = process.env.REACT_APP_PRODUCTS;

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem('authToken');
      const storedUserDetails = localStorage.getItem('userDetails');

      if (!authToken) {
        navigate('/login');
        return;
      }
      if (!storedUserDetails) {
        console.error('User details not found in localStorage.');
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
      if (selectedProducts.length === 0) return;

      const productDetails = await Promise.all(
        selectedProducts.map(async (product) => {
          const response = await fetch(`${dummyProduct}/${product.productNumber}`);
          if (response.ok) {
            const productData = await response.json();
            return { ...productData, quantity: product.quantity };
          }
          return null;
        })
      );
      setProductDetails(productDetails);
    };

    fetchProductDetails();
  }, [selectedProducts, dummyProduct]);

  useEffect(() => {
    const amount = productDetails.reduce((total, product) => total + (product.quantity * product.price), 0);
    setTotalAmount(amount);
  }, [productDetails]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch(`${server}/getuser/${userId}`, {
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
  }, [userId, server]);

  const fetchUserCart = async (userId, authToken) => {
    try {
      const response = await fetch(`${cartHead}/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      if (response.ok) {
        const cartData = await response.json();
        const products = cartData.cartItems;

        const updatedProducts = await Promise.all(products.map(async (product) => {
          const productResponse = await fetch(`${dummyProduct}/${product.productNumber}`);
          if (productResponse.ok) {
            const productData = await productResponse.json();
            return { ...product, category: productData.category, brand: productData.brand };
          }
          return null;
        }));
        if (cartProducts) {
          setLoading(false);
        }
        const selectedProducts = updatedProducts.filter(item => item.checked);
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
      const response = await fetch(`${server}/addaddress/${userDetails._id}`, {
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
        window.location.reload();
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
            <div className='bg-blue-600 text-white rounded-sm grid grid-cols-4 p-2 text-md md:font-semibold font-bold md:text-xl gap-4'>
              <h3 className=''>Product</h3>
              <h3 className=''>Quantity</h3>
              <h3 className=''>Price/unit</h3>
              <h3 className=''>Price</h3>
            </div>
            {productDetails.map(product => (
              <div key={product.id}>
                <div className='border-black border-b w-full'>
                  <div className='grid grid-cols-4 justify-between md:justify-evenly p-2 md:pl-5'>
                    <div className='md:space-x-4 md:pl-4 flex md:flex-row'>
                      <img className='md:flex hidden md:w-16' src={product.thumbnail} alt={product.title} />
                      <div>
                        <h4>{product.title}</h4>
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
        <h4 className='text-xl font-semibold text-white'>Select Address or Add a New Address</h4>
        <div className='flex flex-col-reverse md:flex-row'>
          <div className='md:w-2/3 md:float-left space-y-12'>
            <form className='flex justify-center flex-col md:grid grid-cols-2 gap-2 py-5' onSubmit={handleSubmit}>
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
              <div className='col-span-2 flex justify-center'>
                <button className='w-2/5 md:w-1/5 bg-yellow-400 rounded-sm px-5 py-2 font-semibold shadow-sm shadow-black' type='submit'>SAVE</button>
              </div>
            </form>
          </div>
          <div className='p-5 md:w-1/3 md:float-right items-center flex flex-col justify-center space-y-2'>
            <div className='w-full overflow-y-scroll h-44 bg-red-500 border border-black rounded-sm px-5 py-2 space-y-2 my-2'>
              <p className='text-white font-bold text-sm'><i class="fa fa-map-marker" aria-hidden="true"></i> Tap on address to select</p>
              {addressesList}
            </div>
          </div>
        </div>
        <h5 className='text-white font-bold text-lg'>Selected Address :</h5>
        <div className='w-full h-auto bg-white drop-shadow-lg shadow-inner shadow-black p-5 rounded-sm text-black font-semibold'>{selectedAddress && (
          <div className='flex flex-col md:flex-row md:space-x-4'>
            <p>{selectedAddress.street},</p>
            <p>{selectedAddress.city} ({selectedAddress.postalCode})</p>
            <p>Contact : {selectedAddress.phoneNumber}</p>
          </div>
        )}</div>
      </div>
    </div>
  );
};

export default CheckOut;
