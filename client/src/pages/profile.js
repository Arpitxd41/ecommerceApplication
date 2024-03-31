import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateToken } from '../utils/filter';
import NavbarOne from '../components/navbarOne';
import profileImage from '../images/profile_Reg.png'

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [userData, setUserData] = useState(null); // State to store fetched user data

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const storedUserDetails = localStorage.getItem('userDetails');

    if (!authToken) {
      navigate('/login');
      return;
    }
    if (!storedUserDetails) {
      console.error('User details not found in localStorage.');
      return;
    }

    const userDetails = JSON.parse(storedUserDetails);
    setUserDetails(userDetails);

    fetchUser(userDetails._id, authToken);

    const isTokenValid = validateToken(authToken);
    if (!isTokenValid) {
      navigate('/login');
    }
  }, [navigate]);

  const fetchUser = async (userId, authToken) => {
    try {
      const response = await fetch(`https://localhost:5000/getUser/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        console.log('user data', userData.user);
        setUserData(userData); // Storing fetched user data
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
      <div className="flex flex-col space-y-10 justify-center px-12 py-12 bg-gradient-to-tr from-fuchsia-700 via-cyan-500 to-violet-900">
        <div className="flex flex-col md:flex-row rounded-2xl drop-shadow-2xl shadow-inner shadow-black bg-white space-x-2 object-contain justify-between items-center">
            <div className="md:float-left md:w-1/3">
                  <img src={profileImage} alt="User" className='h-64 md:h-80' />
            </div>
            <div className="md:float-right md:w-2/3 p-2">
              {userData && (
                <div className='py-8'>
                    <div className='flex flex-row items-center space-x-2'>
                      <i class="fa fa-check bg-lime-500 text-white rounded-full p-1 font-bold" aria-hidden="true"></i>
                      <h2 className='font-bold text-xl'>{userData.user.role} : {userData.user.firstName} {userData.user.lastName}</h2>
                    </div>
                    <hr />
                    <div className='flex flex-row space-x-4 font-semibold text-lg'>
                      <h4>UID:</h4>
                      <p> {userData.user._id}</p>
                    </div>
                    <hr />
                    <div className='flex flex-row space-x-4 font-semibold text-lg'>
                      <h4>EMAIL ID:</h4>
                      <p> {userData.user.mail}</p>
                    </div>
                    <hr />
                    <div className='flex flex-col py-2 w-full'>
                      <h3 className='font-semibold text-md md:text-lg md:w-1/3'>Saved Addresses :</h3>
                      {userData.user.address.length > 0 ? (
                        <div className='w-full drop-shadow-sm shadow-inner bg-slate-700 p-2 flex flex-row rounded-sm'>
                          <ul className='shadow-sm rounded-sm bg-gray-50 h-40 overflow-y-scroll space-y-4 px-4 w-11/12'>
                            {userData.user.address.map((address, index) => (
                            <li key={address._id} className='border-b-2 py-2 text-md font-bold'>
                              <p className='flex items-center h-7'>STREET: <span>{address.street}</span></p>
                              <p className='flex items-center h-7'>CITY: <span>{address.city}</span></p>
                              <p className='flex items-center h-7'>POSTAL CODE: <span>{address.postalCode}</span></p>
                              <p className='flex items-center h-7'>CONTACT: <span>{address.phoneNumber}</span></p>
                            </li>
                            ))}
                          </ul>
                          <div className='flex flex-col justify-between px-5 text-white'>
                            <i class="fa fa-angle-up" aria-hidden="true"></i>
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                          </div>
                        </div>
                      ) : (
                        <div className='font-semibold text-white'>
                          <p className='bg-red-600 rounded-sm px-4 py-1 w-fit'>No addresses saved yet!</p>
                          <button onClick={() => navigate('/')} className='bg-lime-600 text-white px-4 py-2 rounded-sm mt-2'>Continue Shopping</button>
                        </div>
                      )}
                  </div>
                </div>
              )}
            </div>
        </div>
        <div className='footer w-full text-center flex justify-center h-40 relative z-40'>
          <div className="">
              <p className="object-contain h-12 items-center align-middle rounded-full px-8 py-2 bg-black shadow-xl shadow-black text-slate-300">
               <a href="https://portfolio-arpit.netlify.app" className="hover:underline mb-2"> Made with <i className="fa fa-heart animate-characters h-12 text-lg"></i> by Arpit</a>
              </p>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default ProfilePage;
