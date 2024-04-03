const addProduct = async (productData) => {
      try {
        const response = await fetch('https://dummyjson.com/products/add', {
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
    