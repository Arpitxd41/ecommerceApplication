import React, { useState } from 'react';

const loadScript = (src) => {
  return new Promise((resolve => {
    const script = document.createElement('script')
    script.src = src;
    script.onload = () => {
      resolve(true);
    }
    script.onerror = () => {
      resolve(false);
    }

    document.body.appendChild(script)
  }))
} 

const PayButton = ({ userId, totalAmount, selectedProducts, selectedAddress }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const displayRazorpay = async () => {
    console.log('Selected Address:', selectedAddress);
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    if (!res) {
      alert('Razorpay sdk failed to load. Check IF you are offline');
      return;
    }

    try {
      if (!selectedAddress) {
        window.alert("Address not selected. Please select Address !");
        return;
      }
      const data = await fetch('https://localhost:5000/user/:id/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, totalAmount, selectedProducts, selectedAddress })
      }).then((t) => t.json());

      console.log('data from backend', data);
      
      const options = {
        key: process.env.RAZORPAY_API_KEY,
        currency: data.currency,
        amount: totalAmount,
        order_id: data.id,
        name: "Shoppers",
        description: "Transaction",
        prefill: {
            name: "Arpit Tiwari",
            email: "arpitnt100@gmail.com",
            contact: "9000090000"
        },
        notes: {
            address: "Razorpay Corporate Office"
        },
        theme: {
            color: "#111"
        }
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <button className='bg-orange-500 rounded-sm px-5 py-2 shadow-md font-semibold' onClick={displayRazorpay}>
        PAYMENT GATEWAY <i className="fa fa-caret-right" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default PayButton;
