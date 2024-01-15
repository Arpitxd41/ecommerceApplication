import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/productCard';
import CounterButtons from '../components/counter';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingSimilarProducts, setLoadingSimilarProducts] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // GETTING PRODUCT
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

  // GETTING SIMILAR PRODUCTS
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

      {/* PRODUCT */}
      {(loadingProduct || loadingSimilarProducts) && <p>Loading...</p>}
      {product && (
        <div className='bg-gradient-to-t from-pink-800 to-fuchsia-800 px-8 pt-8'>
          {/* IMAGE SLIDERS */}
          <div className='flex flex-row bg-gray-50 py-6 rounded-xl drop-shadow-2xl shadow-inner shadow-black p-8 overflow-x-scroll'>
            {/* sliders */}
            <div className="image-carousel flex flex-col justify-center items-center w-1/2 space-y-4">
              <img
                className='aspect-square object-contain flex justify-around w-3/5'
                src={product.images[currentImageIndex]}
                alt={`productImage-${currentImageIndex}`}
              />
              <div className="image-navigation shadow-sm shadow-black flex flex-row text-black font-bold justify-evenly bg-yellow-400 rounded-full w-4/5">
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
              <h2 className='quicksand text-black text-5xl font-bold'>{product.title}</h2>
              <h5 className='text-white bg-red-600 rounded-full w-fit px-5 py-1 my-5'>
                {product.discountPercentage} % OFF
                <i class="fa fa-tag ml-2" aria-hidden="true"></i>
              </h5>
              <div className='flex flex-row'>
                <div className='float-left w-3/5 px-5 space-y-2'>
                  <p className='text-black'>
                    <i class="fa fa-star text-yellow-400 mr-2" aria-hidden="true"></i>
                    {product.rating}
                  </p>
                  <p className='text-black'>
                    <i class="fa fa-certificate text-yellow-400 mr-2" aria-hidden="true"></i>
                    Authentic <a href='somelink' className='text-gray-400 font-bold'>{product.brand}</a> Product
                  </p>
                  <p className='text-black text-4xl'>${product.price} /-</p>
                  <p className='text-black'>
                    <i class="fa fa-cart-plus text-blue-700 mr-2" aria-hidden="true"></i>
                    {product.stock} Units available
                  </p>
                  <h2 className='text-black'>{product.description}</h2>
                </div>
                <div className='float-right w-2/5 h-40 border overflow-hidden object-contain aspect-square'>
                  <img src={product.thumbnail} alt='thumbnail' className='h-auto' />
                </div>
              </div>
              <div>
                <CounterButtons />
              </div>
            </div>
          </div>
          {/* Other product details */}
        </div>
      )}
      
      {/* SIMILAR PRODUCTS */}
      {similarProducts.length > 0 && (
        <div className='bg-gradient-to-b from-pink-800 to-fuchsia-800 p-8 text-center'>
          <div className='bg-black font-semibold'>
            <h2 className='animate-characters my-2 text-3xl'>SIMILAR PRODUCTS</h2>
          </div>
          <div className="bg-gray-300 rounded-xl drop-shadow-2xl shadow-inner shadow-black object-contain overflow-x-scroll justify-around mt-5 py-8 px-6">
            <div className='flex flex-row object-contain space-x-6 w-fit'>
              {similarProducts.map((similarProduct) => (
                <ProductCard key={similarProduct.id} product={similarProduct} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
