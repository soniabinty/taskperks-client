import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-red-500">403 - Forbidden</h1>
      <p className="mt-4">You don't have permission to access this page.</p>
      <Link to="/" className="mt-4 btn btn-primary">
        Go to Home
      </Link>
    </div>
  );
};

export default Forbidden;
