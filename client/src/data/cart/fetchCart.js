export const fetchUserCart = async (userId, authToken, setCartProducts, setLoading) => {
      try {
        const response = await fetch(`https://localhost:5000/user/${userId}/cart`, {
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
    