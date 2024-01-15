import { useState } from 'react';

const CounterButtons = () => {

      const [quantity, setQuantity] = useState(0);
      const [showCounter, setShowCounter] = useState(false);

      const handleAddToCart = () => {
            setQuantity(1);
            setShowCounter(true);
      };
      const handleIncrement = () => {
            setQuantity(quantity + 1);
      };
      const handleDecrement = () => {
            if (quantity > 0) {
              setQuantity(quantity - 1);
            }
            if (quantity === 1){
                  setShowCounter(false);
            }
      };

      return (
            <div className='flex flex-row text-black text-md font-semibold justify-between space-x-2 w-fit h-12 mt-6'>
                {showCounter ? (
                  <div className='text-xl flex flex-row justify-evenly w-52 bg-yellow-400 px-2 py-3 rounded-sm shadow-sm shadow-black'>
                    <button onClick={handleDecrement}>-</button>
                    <span>{quantity}</span>
                    <button onClick={handleIncrement}>+</button>
                  </div>
                  ) : (
                  <button onClick={handleAddToCart} className='bg-yellow-400 w-52 px-5 py-2 rounded-sm shadow-sm shadow-black'>
                    ADD TO CART
                  </button>
                )}
                
                <button className='bg-orange-500 px-12 py-2 rounded-sm shadow-sm shadow-black'>
                  <a href='linkToCheckOut'>BUY NOW</a>
                </button>
              </div>
      )
}

export default CounterButtons;