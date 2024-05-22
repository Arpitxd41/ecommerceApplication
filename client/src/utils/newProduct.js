const addProduct = async (productData) => {
      const DUMMY_PRODUCTS = process.env.REACT_APP_PRODUCTS;
      try {
        const response = await fetch(`${DUMMY_PRODUCTS}/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error adding product:', error);
        throw new Error('Failed to add product');
      }
    };
    
export default addProduct;
    