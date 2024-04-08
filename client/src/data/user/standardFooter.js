import React from 'react';
const portfolio = process.env.REACT_APP_PORTFOLIO;
const Footer = () => {
  return (
    <div className='bg-black footer w-full text-center flex flex-col justify-center h-40 relative z-30 items-center'>
      <div className="">
        <p className="object-contain h-12 items-center align-middle text-white">
          <a href={portfolio} className="hover:text-rose-600 hover:border-x border-rose-600 mb-2 space-x-2 px-12"> <b>Made with <i className="fa fa-heart animate-characters h-12 text-lg"></i> by Arpit </b><i className="fa fa-external-link" aria-hidden="true"></i></a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
