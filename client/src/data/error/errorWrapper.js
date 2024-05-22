import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorBoundary from './errorBoundary';

const ErrorBoundaryWrapper = (props) => {
  const navigate = useNavigate();
  return <ErrorBoundary navigate={navigate} {...props} />;
};

export default ErrorBoundaryWrapper;
