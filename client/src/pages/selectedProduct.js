import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/productCard';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingSimilarProducts, setLoadingSimilarProducts] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        console.log('Product Response:', response.data);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoadingProduct(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        // Ensure that product is available before accessing its category
        if (product && product.category) {
          const response = await axios.get(`https://dummyjson.com/products/category/${product.category}`);
          console.log('Similar Products Response:', response.data);
          setSimilarProducts(response.data.products); // Extract the 'products' array
        }
      } catch (error) {
        console.error('Error fetching similar products:', error);
      } finally {
        setLoadingSimilarProducts(false);
      }
    };

    if (product) {
      fetchSimilarProducts();
    }
  }, [id, product]);

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className='bg-black text-white'>
      {(loadingProduct || loadingSimilarProducts) && <p>Loading...</p>}
      {product && (
        <div className='bg-gradient-to-r from-fuchsia-500 to-black p-8'>
          {/* Image carousel */}
          <div className='flex flex-row bg-gray-50 rounded-md py-6'>
            {/* sliders */}
            <div className="image-carousel flex flex-col justify-center items-center w-1/2 space-y-4">
              <img
                className='aspect-square object-contain flex justify-around w-3/5'
                src={product.images[currentImageIndex]}
                alt={`productImage-${currentImageIndex}`}
              />
              <div className="image-navigation shadow-md shadow-black flex flex-row text-black font-bold justify-evenly bg-yellow-400 rounded-full w-4/5">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageChange(index)}
                    className={index === currentImageIndex ? 'active' : ''}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
            {/* details */}
            <div className='details w-1/2 px-8 py-5 border-l border-black rounded-r-md'>
              <h2 className='quicksand text-black text-6xl font-bold'>{product.title}</h2>
              <h5 className='text-white bg-red-600 rounded-full w-fit px-5 py-1 my-8'>
                <i class="fa fa-tag" aria-hidden="true"></i>
                {product.discountPercentage} % OFF
              </h5>
              <div className='px-5 space-y-2 my-5'>
                <p className='text-black'>
                  <i class="fa fa-star text-yellow-400" aria-hidden="true"></i>
                  {product.rating}
                </p>
                <p className='text-black'>
                  <i class="fa fa-certificate text-yellow-400" aria-hidden="true"></i>
                  Official {product.brand} Product
                </p>
                <p className='text-black text-xl'>${product.price} /-</p>
                <p className='text-black'>
                  <i class="fa fa-cart-plus" aria-hidden="true"></i>
                  {product.stock} Units available
                </p>
                <img src={product.thumbnail} alt='thumbnail' className='h-12' />
              </div>
              <h2 className='text-black'>{product.description}</h2>
            </div>
          </div>
          {/* Other product details */}
        </div>
      )}

      {similarProducts.length > 0 && (
        <div>
          <h2>Similar Products</h2>
          <div className="grid grid-cols-2 gap-3 md:gap-6 mt-5 md:grid-cols-3 lg:grid-cols-3 lg:w-3/4 lg:float-left">
            {similarProducts.map((similarProduct) => (
              <ProductCard key={similarProduct.id} product={similarProduct} />
            ))}
          </div>
        </div>
      )}

      {(!loadingProduct && !loadingSimilarProducts && !product && similarProducts.length === 0) && (
        <p>No product details found</p>
      )}
    </div>
  );
};

export default ProductPage;
