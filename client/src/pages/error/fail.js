import React from 'react';
import { useNavigate } from 'react-router-dom';
import './fail.css';

const ErrorPage = () => {
  const navigate = useNavigate();

  function handleHomeClick() {
    navigate(`/`);
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
        <button id='backhome' onClick={handleHomeClick}>
          <i className="fa fa-home"></i> HOME
        </button>
        <button id='goback' onClick={handleBackClick}>
          <i className="fa fa-arrow-left"></i> GO BACK
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
