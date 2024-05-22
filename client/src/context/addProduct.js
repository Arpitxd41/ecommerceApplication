import React, { useState } from 'react';
import axios from 'axios';
// import addProduct from '../utils/newProduct.js';
import image1 from '../images/icons/image1.png';
import image2 from '../images/icons/image2.png';
import image3 from '../images/icons/image3.png';
import image4 from '../images/icons/image4.png';
import image5 from '../images/icons/image5.png';
import image6 from '../images/icons/image6.png';
import NewProductCard from '../components/newProductCard.js';

const AddProduct = () => {
  const [formData, setFormData] = useState({
        title: '',
        brand: '',
        category: '',
        price: 0,
        stock: 0,
        images: ['', image1, image2, image3, image4, image5, image6],
        description: ''
  });

  const [newProduct, setNewProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(formData.images[0]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const DEVELOPMENT_SERVER = process.env.REACT_APP_DEVELOPMENT_SERVER;
  // const PRODUCTION_SERVER = process.env.REACT_APP_PRODUCTION_SERVER;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${DEVELOPMENT_SERVER}/addnewproduct`, formData)
      const newProduct = response.data;;
      console.log('New product:', newProduct);
      setNewProduct(newProduct)
      setFormData({
            title: '',
            brand: '',
            category: '',
            price: 0,
            stock: 0,
            images: [''],
            description: ''
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className='flex flex-col md:flex-row w-full md:w-5/6 bg-gradient-to-r from-cyan-600 to-violet-600 px-4 py-5 md:p-12 my-5 rounded-sm md:space-x-12 space-y-8 md:space-y-0 justify-center items-center'>
      <div className='w-full md:w-3/5 text-slate-950 bg-gray-100 drop-shadow-xl shadow-inner shadow-black rounded-xl p-2 md:p-8 space-y-5'>
        <h2 className='text-2xl font-bold text-center py-8'>ADD NEW PRODUCT</h2>
          <form onSubmit={handleSubmit}
          className='md:space-y-2 text-md'>
            <div className='flex flex-row justify-evenly'>
              <label className='w-1/3 font-semibold text-lg'>Title:</label>
              <input
                  className='w-2/3 rounded-sm border border-slate-400'
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
              />
            </div>
            <div className='flex flex-row justify-evenly'>
              <label className='w-1/3 font-semibold text-lg'>Price:</label>
              <input
                  className='w-2/3 rounded-sm border border-slate-400'
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
              />
            </div>
            <div className='flex flex-row justify-evenly'>
              <label className='w-1/3 font-semibold text-lg'>Stock:</label>
              <input
                  className='w-2/3 rounded-sm border border-slate-400'
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
              />
            </div>
            <div className='flex flex-row justify-evenly'>
              <label className='w-1/3 font-semibold text-lg'>Brand:</label>
              <input
                  className='w-2/3 rounded-sm border border-slate-400'
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
              />
            </div>
            <div className='flex flex-col md:flex-row justify-evenly'>
              <label className='md:w-1/3 font-semibold text-lg'>Description:</label>
              <textarea
                  className='md:w-2/3 rounded-sm border border-slate-400'
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
              ></textarea>
            </div>

            <div className='flex flex-col items-center'>
              <h3 className='text-lg font-semibold'>Select an Image:</h3>
              <div className='flex flex-wrap justify-center'>
                {formData.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`product-${index}`}
                    onClick={() => handleImageClick(image)}
                    className={`w-24 h-24 m-2 border-2 ${selectedImage === image ? 'border-blue-500' : 'border-gray-300'} cursor-pointer`}
                  />
                ))}
              </div>
            </div>
            
          <div className='flex justify-center'>
            <button className='bg-black shadow-sm shadow-black text-white rounded-sm px-4 py-2 text-lg font-semibold my-12' type="submit">Add Product</button>
          </div>
        </form>
      </div>

      <div className='w-full md:w-1/3 text-slate-950 bg-gray-100 drop-shadow-xl shadow-inner shadow-black rounded-xl py-8 px-12 space-y-5'>
        <h2 className='text-2xl font-bold text-center'>NEW PRODUCT</h2>
        {newProduct && <NewProductCard newProduct={newProduct} />}
      </div>
    </div>
  );
};

export default AddProduct;
