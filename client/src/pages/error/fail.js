import React from 'react';
import { useNavigate } from 'react-router-dom';
import './fail.css';

const ErrorPage = () => {
  const navigate = useNavigate();

  function handleHomeClick() {
    navigate(`/login`);
  }

  function handleBackClick() {
    navigate(-2);
  }

  return (
    <div className="container">
      <div className="gif">
        <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
      </div>
      <div className="content">
        <h1 className="main-heading">This page is not responding.</h1>
        <p className='statement'>
          ...maybe the page you're looking for is not found or never existed.
        </p>
        <div className='flex flex-col md:flex-row space-y-4 md:space-x-6 md:w-2/3'>
          <button id='backhome' onClick={handleHomeClick} className='w-1/2'>
            <i className="fa fa-sign-in"></i> LOGIN AGAIN
          </button>
          <button id='goback' onClick={handleBackClick} className='w-1/2'>
            <i className="fa fa-home"></i> BACK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
