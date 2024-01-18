import { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = ({ userId }) => {
      const [cart, setCart] = useState([]);
      const [products, setProducts] = useState([]);
      const [quantity, setQuantity] = useState(1)

      useEffect(() => {
            const fetchCart = async () => {
                  try {
                        const response = await axios.get(`/cart/${userId}`);
                        setCart(response.data.cartItems);
                  } catch (error) {
                        console.error('Error fetching user cart:', error);
                  }
            }
            fetchCart();
      }, [userId]);

      const fetchProducts = async() => {
            try {
                  const response = await axios.get('/products');
                  setProducts(response.data);
            } catch (error) {
                  console.error('Error fetching products:', error);
            }
      };
      useEffect(() => {
            fetchProducts();
      }, []);

      const handleAddToCart = async(productId) => {
            try {
                  await axios.post(`/cart/${userId}/add`, {
                        productId,
                        productQuantity : quantity
                  });

                  const response = await axios.get(`/user/${userId}`);
                  setCart(response.data.cartItems);

                  setQuantity(1);
            } catch (error) {
                  console.error('Error adding to cart:', error);
            }
      };

      const handleRemove = async(productId) => {
            try {
                  await axios.delete(`/cart/${userId}/remove/${productId}`);
                  // Refreshing the cart after removal of the product
                  const response = await axios.get(`/cart/${userId}`);
                  setCart(response.data.cartItems);
            } catch (error) {
                  console.error('Error removing from cart:', error);
            }
      };
      
      const handleRemoveAll = async() => {
            try {
                  await axios.delete(`/cart/${userId}/removeAll`);
                  // Refresh the cart after removing all products
                  const response = await axios.get(`/cart/${userId}`);
                  setCart(response.data.cartItems);
            } catch (error) {
                  console.error('Error removing all products from the cart', error);
            }
      };
      return (
            <div>
                  <h2>Your Cart</h2>
                  <ul>
                    {cart.map((cartItem) => (
                      <li key={cartItem.product._id}>
                        {cartItem.product.name} - Quantity: {cartItem.quantity}
                        <button onClick={() => handleRemove(cartItem.product._id)}>
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                  <hr />
                  <h2>Available Products</h2>
                  <ul>
                    {products.map((product) => (
                      <li key={product._id}>
                        {product.name} - Price: ${product.price}
                        <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
                      </li>
                    ))}
                  </ul>
                  <hr />
                  <button onClick={handleRemoveAll}>Remove All From Cart</button>
            </div>
      );
}

export default Cart;