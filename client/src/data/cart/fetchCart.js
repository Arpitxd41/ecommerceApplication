export const fetchUserCart = async (userId, authToken, setCartProducts, setLoading) => {
  const userCartHead = process.env.REACT_APP_USER_CART;
      try {
        const response = await fetch(`${userCartHead}/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        if (response.ok) {
          const cartData = await response.json();
          setCartProducts(cartData.cartItems);
          setLoading(false);
        } else {
          console.error('User cart empty', response);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };
    