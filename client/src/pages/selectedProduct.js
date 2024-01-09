import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        console.log('Product Response :', response.data);        
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);


  useEffect(() => {
    const fetchSimilarProducts = async () => {
      // Fetch similar products based on brand and category
      try {
        const response = await axios.get(`https://dummyjson.com/similar-products/${id}`);
        console.log('Similar Products Response:', response.data);
        setSimilarProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching similar products:', error);
      }
    };

    // Check if 'product' state is available before fetching similar products
    if (product) {
      fetchSimilarProducts();
    }
  }, [id, product]);

  // Render the product details
  return (
    <div className='bg-black text-white'>
      {loading && <p>Loading...</p>}
      {product && (
        <div>
          {/* Render product details using 'product' state */}
          <h1 className='text-red-500'>Product Name = </h1>
          <h2>{product.title}</h2>
          {/* Other product details */}
        </div>
      )}

      {/* Render similar products */}
      {similarProducts.length > 0 && (
        <div>
          <h2>Similar Products</h2>
          {similarProducts.map(similarProduct => (
            <div key={similarProduct.id}>
              {/* Render similar product details */}
              <p>{similarProduct.title}</p>
              {/* Other similar product details */}
            </div>
          ))}
        </div>
      )}

      {/* Render JSON response */}
      {product && (
        <pre>{JSON.stringify(product, null, 2)}</pre>
      )}
    </div>
  );
};

export default ProductPage;
