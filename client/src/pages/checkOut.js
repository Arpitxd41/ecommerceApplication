import React, { useState } from 'react';

const CheckOut = ({ cartProducts, userDetails }) => {
  const [selectedAddress, setSelectedAddress] = useState('');
  const [orderConfirmation, setOrderConfirmation] = useState(false);

  // Calculate total price
  const totalPrice = cartProducts.reduce((total, product) => {
    if (product.checked) {
      return total + (product.price * product.quantity);
    }
    return total;
  }, 0);

  // Handle address selection
  const handleAddressSelection = (address) => {
    setSelectedAddress(address);
  };

  // Handle order confirmation
  const handleOrderConfirmation = () => {
    // Perform actions to create order using userDetails, cartProducts, and selectedAddress
    // Set orderConfirmation to true upon successful order creation
    setOrderConfirmation(true);
  };

  return (
    <div>
      {/* Yellow bar on top */}
      <div className="bg-yellow-400 shadow-md py-4 px-8 flex justify-between items-center text-white text-lg font-semibold">
        {/* Button for redirecting to payment gateway */}
        <button
          onClick={() => {
            // Handle redirection to payment gateway
          }}
          className="text-md text-black bg-green-600 px-5 py-2 border-2 border-green-600 rounded-sm shadow-sm"
        >
          Proceed to Payment
        </button>
      </div>

      {/* List of checked products */}
      <div>
        <h2 className="text-lg font-semibold mt-4">Selected Products:</h2>
        <ul>
          {cartProducts.map((product) => {
            if (product.checked) {
              return <li key={product.id}>{product.title}</li>;
            }
            return null;
          })}
        </ul>
      </div>

      {/* Bill table */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold">Bill:</h2>
        <table className="border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Product Title</th>
              <th className="border border-gray-400 px-4 py-2">Quantity</th>
              <th className="border border-gray-400 px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map((product) => {
              if (product.checked) {
                return (
                  <tr key={product.id}>
                    <td className="border border-gray-400 px-4 py-2">{product.title}</td>
                    <td className="border border-gray-400 px-4 py-2">{product.quantity}</td>
                    <td className="border border-gray-400 px-4 py-2">{product.price * product.quantity}</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
        <div className="mt-4 font-semibold">Total Price: ${totalPrice.toFixed(2)}</div>
      </div>

      {/* Address selection */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold">Select Address:</h2>
        <select
          value={selectedAddress}
          onChange={(e) => handleAddressSelection(e.target.value)}
          className="mt-2 border border-gray-400 rounded-md p-2"
        >
          {/* Render addresses as options */}
          <option value="">Select an address</option>
          {userDetails.addresses.map((address) => (
            <option key={address.id} value={address}>{address}</option>
          ))}
        </select>
        <textarea
          className="mt-4 border border-gray-400 rounded-md p-2 w-full h-24"
          value={selectedAddress}
          readOnly
        />
      </div>

      {/* Confirm button */}
      <div className="mt-8">
        <button
          onClick={handleOrderConfirmation}
          className="text-md text-white bg-green-600 px-5 py-2 border-2 border-green-600 rounded-sm shadow-sm"
        >
          Confirm Order
        </button>
      </div>

      {/* Display order confirmation message */}
      {orderConfirmation && (
        <div className="mt-4 text-green-600 font-semibold">Order confirmed successfully!</div>
      )}
    </div>
  );
};

export default CheckOut;
