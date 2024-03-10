import React from 'react';

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

const PayButton = () => {

  const displayRazorpay = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    if (!res) {
      alert('Razorpay sdk failed to load. Check IF you are offline');
      return;
    }

    const data = await fetch('https://localhost:5000/user/:id/order', { method: 'POST' }).then((t) => t.json());
    console.log('data from backend', data);
    const options = {
      key: process.env.RAZORPAY_API_KEY,
      name: "Shoppers",
      description: "Transaction",
      prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000"
      },
      notes: {
          address: "Razorpay Corporate Office"
      },
      theme: {
          color: "#3399cc"
      }
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <button  className='bg-orange-500 rounded-sm px-5 py-2 shadow-md font-semibold' onClick={displayRazorpay}> PAYMENT GATEWAY <i className="fa fa-caret-right" aria-hidden="true"></i></button> 
  );
};

export default PayButton;
