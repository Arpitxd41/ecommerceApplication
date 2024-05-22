import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EditUserForm from '../utils/roleCall.js';

const UserList = ({adminId}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditUserForm, setShowEditUserForm] = useState(false);
  const [editButtonText, setEditButtonText] = useState('EDIT USER');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const PRODUCTION_SERVER = process.env.REACT_APP_PRODUCTION_SERVER;
        const DEVELOPMENT_SERVER = process.env.REACT_APP_DEVELOPMENT_SERVER;
        const response = await axios.get(`${DEVELOPMENT_SERVER}/getallusers`);
        const userList = Object.values(response.data.users);
        setUsers(userList.reverse());
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  

  const toggleEditUserForm = () => {
    setShowEditUserForm(!showEditUserForm);
    if (showEditUserForm) {
      setEditButtonText(`Edit User`);
    } else {
      setEditButtonText('Cancel');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 px-2 md:px-8 py-8 md:p-16'>
      
      <div className='bg-gray-200 drop-shadow-xl shadow-inner shadow-black rounded-xl px-4 md:px-8 py-8'>
        <h4 className='text-3xl text-black w-full text-center font-bold my-4'>USERS LIST</h4>
        <div className='w-full flex justify-between mb-12 mt-5'>
          {/* <h4 className='bg-yellow-500 px-4 py-2 text-white rounded-sm shadow-sm shadow-black text-lg font-semibold border-yellow-500 border'>USERS</h4> */}
          <button className='w-40 bg-black px-4 py-2 text-white rounded-sm shadow-sm shadow-black text-md md:text-lg font-semibold border-black border' onClick={toggleEditUserForm}>{editButtonText}</button>
          {showEditUserForm && (
            <div id='edit-group' className='absolute w-full top-40 bg-black bg-opacity-70 py-5 px-12'>
              <EditUserForm adminId={adminId} />
            </div>
          )}
        </div>
        <ul className='text-gray-900 space-y-5 y'>
        {users.map((user) => (
          <li className='w-full justify-between flex flex-row border-b border-b-slate-400' key={user.id}>
            <div className='w-3/5 md:w-4/5 flex flex-col md:flex-row space-x-2 text-md md:text-lg font-semibold'>
              <div className='md:w-1/4 flex items-center space-x-2 border'>
                <i className="fa fa-user" aria-hidden="true"></i>
                <h4>{user.firstName} {user.lastName}</h4>
              </div>
              <div className='w-3/4 flex flex-col md:flex-row md:items-center md:space-x-4 justify-start md:justify-between'>
                <p className='flex w-fit md:w-1/5 bg-green-600 px-2 rounded-full text-white text-sm font-semibold justify-center text-center'>{`${user.role}`}</p>
                <p className='md:w-5/6'>{`${user.mail}`}</p>
                <p className='md:w-5/6'>{`${user._id}`}</p>
              </div>
            </div>
            <div className='flex w-2/5 md:w-1/5 md:items-center justify-end'>
              <Link to={`/orders/${user._id}`}>
                <button className='text-sm md:text-md bg-blue-600 rounded-sm text-white font-semibold shadow-sm shadow-black px-5 py-2'>ORDERS</button>
              </Link>
            </div>
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
