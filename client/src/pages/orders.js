import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateToken } from '../utils/filter.js';
import NavbarOne from '../components/navbarOne.js';
import OrderBundle from '../components/orderedBundle.js';

const Orders = () => {
  const [userDetails, setUserDetails] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

    fetchUserOrders(userDetails._id, authToken);

    const isTokenValid = validateToken(authToken);
    if (!isTokenValid) {
      navigate('/login');
    }
  }, [navigate]);

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
        setOrders(ordersData.reverse()); // Reverse the order of ordersData
        console.log('orderData in orders page:', ordersData);
        setLoading(false);
      } else {
        console.error('Failed to fetch User orders:', response);
        setLoading(false);
      }
      // const productNumber = orderData.
    } catch (error) {
      console.error('Error fetching user orders:', error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <NavbarOne />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-4">My Orders</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid gap-4">
            {orders.map(order => (
              <div key={order._id} className="shadow-md rounded-md h-36 w-5/6">
                <div className='bg-slate-700 text-white p-4 w-1/3 float-left h-36'>
                  <h2 className="text-lg font-semibold mb-2">Order ID: {order.orderId}</h2>
                  {order.orderDetails.length > 0 && (
                    <p className='text-green-400 font-semibold'>Order Status : {order.orderDetails[0].orderStatus}</p>
                  )}
                  <div className='flex flex-row'>
                    <p>Amount Paid : </p>
                    <h4 className='font-bold ml-2'> ₹ {order.totalAmount}</h4>
                  </div>                  
                  {order.paymentDetails.length > 0 && (
                    <p>Paid by {order.paymentDetails[0].method}</p>
                  )}
                </div>
                <div className='w-2/3 bg-white flex flex-row float-right object-contain h-36 items-center py-2 px-4'>
                      <i className="fa fa-chevron-left text-5xl text-slate-700" aria-hidden="true"></i>
                      <OrderBundle order={order} />
                      <i className="fa fa-chevron-right text-5xl text-slate-700" aria-hidden="true"></i>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
