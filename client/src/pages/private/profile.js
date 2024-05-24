import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateToken } from '../../utils/filter';
import axios from 'axios';
import NavbarOne from '../../components/navbarOne';
import profileImage from '../../images/kingStickmanByIconScoutStore.png'
import shoppers from '../../images/shopperbg.png'
import Footer from '../../data/user/standardFooter';
import Cookies from 'js-cookie'
const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  // const SERVER = process.env.REACT_APP_DEVELOPMENT_SERVER;
  const SERVER = process.env.REACT_APP_PRODUCTION_SERVER;
  
  useEffect(() => {
    const authToken = Cookies.get('authToken');
    const storedUserDetails = Cookies.get('userDetails');

    if (!authToken) {
      navigate('/login');
      return;
    }
    if (!storedUserDetails) {
      console.error('User details not found in localStorage.');
      return;
    }

    const userDetails = JSON.parse(storedUserDetails);
    fetchUser(userDetails._id, authToken);

    const isTokenValid = validateToken(authToken);
    if (!isTokenValid) {
      navigate('/login');
    }
  }, [navigate]);

  const fetchUser = async (userId, authToken) => {
    try {
      const response = await axios.get(`${SERVER}/getuser/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      
      if (response.status === 200) {
        const userData = response.data;
        setUserData(userData);
        setLoading(false);
      } else {
        console.error('Failed to fetch user data', response);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  return (
    <div className="">
      <NavbarOne />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full flex flex-col space-y-10 justify-center px-5 md:px-12 py-8 md:py-12 bg-gradient-to-tr from-fuchsia-700 via-cyan-500 to-violet-900">
          <div className="flex flex-col md:flex-row rounded-md drop-shadow-2xl shadow-inner shadow-black bg-white md:space-x-2 object-none md:object-contain justify-between items-center p-2">
              <div className="md:float-left w-full md:w-1/3 flex justify-center bg-cover bg-no-repeat bg-center">
                    <img src={shoppers} alt="User" className='h-auto' />
              </div>
              <div className="md:float-right w-full md:w-2/3 p-2">
                {userData && (
                  <div className='space-y-3'>
                   <i className="fa fa-check bg-lime-500 text-white rounded-sm px-4 py-1 font-bold" aria-hidden="true"></i>
                      <div className='border-b flex flex-row items-center space-x-2'>
                        <h2 className='font-bold text-xl'>{userData.user.role} : {userData.user.firstName} {userData.user.lastName}</h2>
                      </div>
                      <div className='border-b flex flex-row space-x-4 font-semibold text-lg'>
                        <h4 className='font-bold text-xl'>UID:</h4>
                        <h4 className='font-bold text-xl'> {userData.user._id}</h4>
                      </div>
                      <div className='border-b flex flex-row space-x-4 font-bold text-xl'>
                        <h4 className=''>EMAIL ID:</h4>
                        <p> {userData.user.mail}</p>
                      </div>
                      <div className='flex flex-col space-y-2 w-full'>
                        <h3 className='font-bold text-xl'>SAVED ADDRESSES :</h3>
                        {userData.user.address.length > 0 ? (
                          <div className='w-full rounded-sm flex flex-col md:flex-row'>
                            <ul className='w-full border-x border-black h-60 overflow-y-scroll space-y-4 px-2 md:px-4'>
                              {userData.user.address.map((address, index) => (
                              <li key={address._id} className='border-b-2 py-2 text-lg font-bold text-black flex flex-col items-start'>
                                <p className='flex items-center'>STREET: <span className='text-gray-500 text-lg '>{address.street}</span></p>
                                <p className='flex items-center'>CITY: <span className='text-gray-500 text-lg '>{address.city}</span></p>
                                <p className='flex items-center'>POSTAL CODE: <span className='text-gray-500 text-lg '>{address.postalCode}</span></p>
                                <p className='flex items-center'>CONTACT: <span className='text-gray-500 text-lg '>{address.phoneNumber}</span></p>
                              </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className='font-semibold text-white'>
                            <p className='bg-red-600 rounded-sm md:px-4 py-1 w-fit'>No addresses saved yet!</p>
                            <button onClick={() => navigate('/')} className='bg-lime-600 text-white px-4 py-2 rounded-sm mt-2'>Continue Shopping</button>
                          </div>
                        )}
                    </div>
                  </div>
                )}
              </div>
          </div>
          <div className='bg-white drop-shadow-xl shadow-inner shadow-black rounded-md px-8 py-5 text-bold space-y-2'>
            <i className="fa fa-paperclip text-xl bg-yellow-500 text-white px-5 rounded-sm" aria-hidden="true"></i>
            <h5 className='text-black font-semibold'>"Greetings viewer - I present a testament to my expertise in web development. Designed and developed entirely by me, this platform combines the latest technologies to deliver a seamless user experience. From sleek CSS and Tailwind CSS designs to responsive React components, every detail is meticulously crafted to ensure user satisfaction.<br />
                         A robust backend built on Express.js and Node.js, with authentication secured using bcrypt and JWT Tokens. Leveraging MongoDB with Mongoose, product data and user information are managed efficiently. Integrating Razorpay for payment processing, ensured smooth transactions using ngrok for local testing. With icons, illustrations and animations the frontend is adorned with interactive elements, for an engaging user interface. This project not only showcases my frontend design skills but also highlights my proficiency in backend development and integration of third-party services, making it a standout addition to my web development portfolio."</h5>

            <div className='flex justify-center items-center'>
              <img src={profileImage} alt="User" className='h-60 p-2' />
            </div>
          </div>        
        </div>
      )}
      <Footer />
    </div>
  );
  
};

export default ProfilePage;
