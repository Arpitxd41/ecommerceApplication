import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { validateToken } from '../utils/filter.js';
import NavbarOne from '../components/navbarOne.js';
import OrderBundle from '../components/orderedBundle.js';
import Footer from '../data/user/standardFooter';

const Orders = () => {
  const [userDetails, setUserDetails] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userId } = useParams();
  const userHead = process.env.REACT_APP_USER;

  useEffect(() => {
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
    
    fetchUserOrders(userId, authToken);

    const isTokenValid = validateToken(authToken);
    if (!isTokenValid) {
      navigate('/login');
    }
  }, [navigate, userId]);

  const fetchUserOrders = async (userId, authToken) => {
    try {
      const response = await fetch(`${userHead}/getorder/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      if (response.ok) {
        const ordersData = await response.json();
        setOrders(ordersData.reverse());
        setLoading(false);
      } else {
        console.error('Failed to fetch User orders:', response);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching user orders:', error);
      setLoading(false);
    }
  };

  
  const handleLogoClick = () => {
    if (userDetails.role === 'Admin') {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="bg-gray-200">
      <NavbarOne />
        <div className='text-center items-center bg-black px-8 py-2 justify-between flex flex-row'>
          <h1 className="text-3xl font-semibold">{userDetails.role} ACCESS</h1>
          <h1 className="text-white text-xl font-semibold">USER: {userId}</h1>
        </div>
      <div className="p-2 h-96">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="">
            {orders.length === 0 ? (
              <div className='font-semibold text-white'>
                <p className='bg-red-600 rounded-sm px-4 py-1 w-fit'>No orders made yet!</p>
                <button onClick={handleLogoClick} className='bg-lime-600 text-white px-4 py-2 rounded-sm mt-2'>Continue Shopping</button>
              </div>
            ) : (
              orders.map(order => (
                <div key={order._id} className="shadow-md rounded-md lg:h-36 w-full object-contain flex md:flex-row flex-col border-5 border-red my-6 md:my-2">
                  <div className='w-full bg-slate-700 text-white p-2 md:w-3/5 md:float-left lg:h-36 pl-5'>
                    <h2 className="text-lg font-semibold bg-black px-2">Order ID : {order.orderId}</h2>
                    <div className='flex flex-col justify-evenly'>
                      <div className='w-full flex flex-row px-2 justify-between'>
                      {order.orderDetails.length > 0 && (
                        <p className='text-lime-500 font-semibold'>Status : {order.orderDetails[0].orderStatus}</p>
                      )}
                        <div className='flex flex-row space-x-4'>
                        {order.paymentDetails.length > 0 && (
                          <p className='font-bold'>Payment Method : {order.paymentDetails[0].method}</p>
                        )}
                          <h4 className='font-bold'>Amount : ₹ {order.totalAmount}</h4>
                        </div>
                      </div>
                      <div className='w-full flex flex-col px-2'>
                        <h4 className='font-semibold'>Delivery Address : </h4>
                        <div className="bg-white text-black rounded-sm px-4 h-12 overflow-y-scroll">
                          <div className="space-x-2">
                            <u>Street : </u> <b>{order.selectedAddress.street}</b>
                            <u>City : </u> <b>{order.selectedAddress.city}</b>
                            <u>Postal Code : </u> <b>{order.selectedAddress.postalCode}</b>
                            <u>Phone Number : </u> <b>{order.selectedAddress.phoneNumber}</b>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='w-full md:w-2/5 bg-lime-400 flex flex-row md:float-right object-contain lg:h-36 items-center py-2 px-2 space-x-2'>
                        <i className="fa fa-caret-left text-5xl text-slate-700" aria-hidden="true"></i>
                        <div className='w-5/6 bg-white px-2 rounded-lg drop-shadow-xl shadow-inner shadow-black'>
                          <OrderBundle order={order} />
                        </div>
                        <i className="fa fa-caret-right text-5xl text-slate-700" aria-hidden="true"></i>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Orders;
