import React, { useState } from 'react';
import axios from 'axios';

const EditUserForm = ({adminId}) => {
  const [userId, setUserId] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  // const SERVER = process.env.REACT_APP_DEVELOPMENT_SERVER;
  const SERVER = process.env.REACT_APP_PRODUCTION_SERVER;

  const handleApprove = async () => {
    if (!userId) {
      alert('Please enter a user ID');
      return;
    }

    if (!isAdmin && !isUser) {
      alert('Please select a role');
      return;
    }

    const payload = {
      userId,
      role: isAdmin ? 'ADMIN' : 'USER',
    };

    try {
      await axios.put(`${SERVER}/edituser/${adminId}`, payload);
      alert('User role updated successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('An error occurred while updating user role');
    }
  };

  return (
    <div className='bg-black p-5 rounded-sm'>
      <input
        className='rounded-sm border-none text-black font-bold'
        type="text"
        placeholder="Enter user ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <div className='flex flex-row items-center font-bold'>
        <input
          className='rounded-full border-none'
          type="checkbox"
          id="adminCheckbox"
          checked={isAdmin}
          onChange={() => setIsAdmin(!isAdmin)}
        />
        <label htmlFor="adminCheckbox">Admin</label>
      </div>
      <div className='flex flex-row items-center font-bold'>
        <input
          className='rounded-full border-none'
          type="checkbox"
          id="userCheckbox"
          checked={isUser}
          onChange={() => setIsUser(!isUser)}
        />
        <label htmlFor="userCheckbox">User</label>
      </div>
      <div className='px-2'>
            <button className='bg-lime-600 rounded-sm font-bold px-4 py-1' onClick={handleApprove}>Approve</button>
      </div>
    </div>
  );
};

export default EditUserForm;
