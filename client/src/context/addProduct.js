import React, { useState } from 'react';
import addProduct from '../utils/newProduct.js';
import NewProductCard from '../components/newProductCard.js';

const AddProduct = () => {
  const [formData, setFormData] = useState({
        title: '',
        brand: '',
        category: '',
        price: 0,
        stock: 0,
        images: [''],
        thumbnail: '',
        description: ''
  });

  const [newProduct, setNewProduct] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = await addProduct(formData);
      console.log('New product:', newProduct);
      setNewProduct(newProduct)
      setFormData({
            title: '',
            brand: '',
            category: '',
            price: 0,
            stock: 0,
            images: [''],
            thumbnail: '',
            description: ''
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className='flex flex-col md:flex-row w-full md:w-5/6 bg-gradient-to-r from-cyan-600 to-violet-600 px-4 py-5 md:p-12 my-5 rounded-sm space-x-12 md:space-y-8 justify-around'>
      <div className='w-11/12 md:w-3/5 text-slate-950 bg-gray-100 drop-shadow-xl shadow-inner shadow-black rounded-xl p-2 md:p-8 space-y-5'>
        <h2 className='text-xl md:text-2xl font-bold text-center'>ADD NEW PRODUCT</h2>
          <form onSubmit={handleSubmit}
          className='space-y-2 text-md'>
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
            <div className='flex flex-row justify-evenly'>
              <label className='w-1/3 font-semibold text-lg'>Description:</label>
              <textarea
                  className='w-2/3 rounded-sm border border-slate-400'
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
              ></textarea>
            </div>
          <div className='flex justify-center'>
            <button className='bg-black shadow-sm shadow-black text-white rounded-sm px-4 py-2 text-lg font-semibold my-12' type="submit">Add Product</button>
          </div>
        </form>
      </div>

      <div className='w-11/12 md:w-1/3 text-slate-950 bg-gray-100 drop-shadow-xl shadow-inner shadow-black rounded-xl py-8 px-12 space-y-5'>
        <h2 className='text-2xl font-bold text-center'>NEW PRODUCT</h2>
        {newProduct && <NewProductCard newProduct={newProduct} />}
      </div>
    </div>
  );
};

export default AddProduct;
