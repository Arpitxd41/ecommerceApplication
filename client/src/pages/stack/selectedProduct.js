import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import ProductCard from '../../components/productCard';
import NavbarOne from '../../components/navbarOne';
import CounterButtons from '../../utils/counter';
import Footer from '../../data/user/standardFooter';

const useUserAuthentication = () => {
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    const storedUserDetails = JSON.parse(Cookies.get('userDetails') || '{}');
    setUserDetails(storedUserDetails);
  }, []);
  return userDetails;
};
const ProductPage = (dummyUserDetails) => {
  const { productId } = useParams();
  
  const userDetails = useUserAuthentication();
  let userId;
  if (!userDetails) {
    userId = dummyUserDetails._id;
  } else {
    userId = userDetails._id;
  }
  const [product, setProduct] = useState();
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingSimilarProducts, setLoadingSimilarProducts] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const SERVER = process.env.REACT_APP_DEVELOPMENT_SERVER;
  // const SERVER = process.env.REACT_APP_PRODUCTION_SERVER;
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${SERVER}/product/${productId}`);
        
        const product = response.data.product;
        setProduct(product);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoadingProduct(false);
      }
    };

    fetchProduct();
  }, [productId, SERVER]);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      
      try {
        if (product && product.category) {
          const response = await axios.get(`${SERVER}/all_products/${product.category}`);
          setSimilarProducts(response.data.products);
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
  }, [productId, product, SERVER]);

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className='bg-black text-white'>
      <div className='flex justify-center'>
        <NavbarOne />
      </div>
      {/* PRODUCT */}
      {(loadingProduct || loadingSimilarProducts) && <p>Loading...</p>}
      {product && (
        <div className='bg-gradient-to-t from-pink-800 to-fuchsia-800 px-4 md:px-8 pt-4 md:pt-8'>
          {/* IMAGE SLIDERS */}
          <div className='flex flex-col md:flex-row bg-gray-50 rounded-sm drop-shadow-2xl shadow-inner shadow-black py-2 lg:p-8 overflow-x-scroll'>
            {/* sliders */}
            <div className="image-carousel flex flex-col justify-center items-center w-full md:w-1/2 space-y-4">
              <img
                className='aspect-square object-contain flex justify-around w-4/5 md:w-3/5'
                src={product.images[currentImageIndex]}
                alt={`productImage-${currentImageIndex}`}
              />
              <div className="image-navigation flex flex-row text-black font-bold justify-evenly w-2/5">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageChange(index)}
                    className={index === currentImageIndex ? 'active bg-yellow-400 rounded-full w-5' : 'bg-yellow-400 rounded-full w-5'}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
            {/* details */}
            <div className='details md:w-1/2 px-2 md:px-4 py-5 md:border-l border-black rounded-r-md'>
              <h2 className='quicksand text-black text-3xl md:text-5xl font-bold'>{product.title}</h2>
              <h5 className='text-white bg-red-600 rounded-full w-fit px-5 py-1 my-5'>
                {product.discountPercentage} % OFF
                <i className="fa fa-tag ml-2" aria-hidden="true"></i>
              </h5>
              <div className='flex md:flex-row'>
                <div className='float-left w-full lg:w-3/5 px-2 md:px-5 space-y-2'>
                  <div className='flex flex-row items-center'>
                    <i className="fa fa-star text-yellow-400 mr-2" aria-hidden="true"></i>
                    <p className='text-green-600 font-bold text-xl'>{product.rating}</p>
                  </div>
                  <div className='flex flex-row items-center text-black'>
                    <i className="fa fa-certificate text-yellow-400 mr-2" aria-hidden="true"></i>
                    <p>Authentic <a href='somelink' className='text-gray-400 font-bold'>{product.brand}</a> Product</p>
                  </div>
                  <p className='text-black text-4xl'><i className="fa fa-inr" aria-hidden="true"></i> {product.price} /-</p>
                  <div className='text-black flex flex-row items-center'>
                    <i className="fa fa-cart-plus text-blue-700 mr-2" aria-hidden="true"></i>
                    <p>{product.stock} Units available</p>
                  </div>
                  <h2 className='text-black'>{product.description}</h2>
                </div>
                <div className='hidden lg:flex lg:float-right lg:w-2/5 h-40 border overflow-hidden object-contain aspect-square'>
                  <img src={product.thumbnail} alt='thumbnail' className='h-auto' />
                </div>
              </div>
              <div className='flex flex-row text-black text-md font-semibold justify-between space-x-2 h-12 mt-6 lg:mt-12 items-end'>
                <CounterButtons userId={userId} product={product} />
              </div>
            </div>
          </div>
          {/* Other product details */}
        </div>
      )}
      
      {/* SIMILAR PRODUCTS */}
      {similarProducts.length > 0 && (
        <div className='bg-gradient-to-b from-pink-800 to-fuchsia-800 py-8 md:p-8 text-center'>
          <div className='bg-black font-semibold rounded-sm'>
            <h2 className='animate-characters my-2 text-3xl'>SIMILAR PRODUCTS</h2>
          </div>
          <div className="bg-gray-300 rounded-sm drop-shadow-2xl shadow-inner shadow-black object-contain overflow-x-scroll justify-around mt-5 py-8 md:px-6">
            <div className='grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-5 flex-row object-contain justify-center'>
              {similarProducts.map((similarProduct) => (
                <ProductCard key={similarProduct._id} product={similarProduct} userDetails={userDetails} />
              ))}
            </div>
          </div>
        </div>
      )}

    <Footer />
    </div>
  );
};

export default ProductPage;
