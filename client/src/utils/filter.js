const validateToken = (token) => {
      try {
            const tokenParts = token.split('.');
            const payload = JSON.parse(atob(tokenParts[1]));
            const currentTime = Math.floor(Date.now() / 1000);
            // checking token for expiration
            if (payload.exp && payload.exp < currentTime) {
              return false;
            }
            return true;
      } catch (error) {
            console.error('Error decoding token:', error);
            return false;
      }
};

export { validateToken };