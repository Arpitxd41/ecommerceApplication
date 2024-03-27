import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://localhost:5000/getAllUsers');
        const userList = Object.values(response.data.users);
        setUsers(userList.reverse());
        console.log('user list reversed', userList.reverse());
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRedirect = async (req, res) => {
      navigate(`/orders/{user.id}`)
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 p-8 md:p-16'>
      <div className='bg-gray-200 drop-shadow-xl shadow-inner shadow-black rounded-xl p-8'>
        <ul className='text-gray-900 space-y-5 y'>
        {users.map((user) => (
          <li className='justify-between flex flex-row border-b border-b-slate-400' key={user.id}>
            <div className='w-3/5 md:w-4/5 flex flex-col md:flex-row space-x-2 text-md md:text-lg font-semibold'>
              <div className='md:w-1/4 flex items-center space-x-2 border'>
                <i className="fa fa-user" aria-hidden="true"></i>
                <h4>{user.firstName} {user.lastName}</h4>
              </div>
              <div className='w-3/4 flex flex-col md:flex-row items-center md:space-x-4'>
                <p className='hidden md:flex md:w-1/6 bg-green-600 px-3 py-1 rounded-sm text-white text-lg font-semibold text-center'>{`${user.role}`}</p>
                <p className='md:w-5/6'>{`${user.mail}`}</p>
              </div>
            </div>
            <div className='flex w-2/5 md:w-1/5 items-center'>
              <Link to={`/orders/${user._id}`}>
                <button className='bg-blue-600 rounded-sm text-white font-semibold shadow-sm shadow-black px-5 py-2'>ORDERS</button>
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
