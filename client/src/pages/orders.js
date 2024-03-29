import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { validateToken } from '../utils/filter.js';
import NavbarOne from '../components/navbarOne.js';
import OrderBundle from '../components/orderedBundle.js';

const Orders = () => {
  const [userDetails, setUserDetails] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userId } = useParams();

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
      const response = await fetch(`https://localhost:5000/user/${userId}/getOrder`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      if (response.ok) {
        const ordersData = await response.json();
        setOrders(ordersData.reverse());
        console.log('orderData in orders page:', ordersData);
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
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-8 text-center">My Orders</h1>
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
                  <div className='w-full bg-slate-700 text-white p-2 md:w-1/2 md:float-left lg:h-36'>
                    <h2 className="text-lg font-semibold bg-black px-2">Order ID : {order.orderId}</h2>
                    <div className='flex flex-col justify-evenly'>
                      <div className='w-full flex flex-row px-2 justify-between'>
                      {order.orderDetails.length > 0 && (
                        <p className='text-green-400 font-semibold'>Status : {order.orderDetails[0].orderStatus}</p>
                      )}
                        <div className='flex flex-row'>
                        {order.paymentDetails.length > 0 && (
                          <p>Payment Method : {order.paymentDetails[0].method}</p>
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
                  <div className='w-full md:w-1/2 bg-lime-400 flex flex-row md:float-right object-contain lg:h-36 items-center py-2 px-2 space-x-2'>
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
        <div className='p-2 object-contain h-fit bg-gray-700'>
        <hr className='border-gray-950 my-12 relative z-40'/>
        <div className='footer w-full text-center flex justify-center h-40 relative z-40'>
          <div className="">
              <p className="object-contain h-12 items-center align-middle rounded-full px-8 py-2 bg-black shadow-xl shadow-black text-slate-300">
               <a href="{somelink}" className="hover:underline mb-2"> Made with <i className="fa fa-heart animate-characters h-12 text-lg"></i> by Arpit</a>
              </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Orders;
