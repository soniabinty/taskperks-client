import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer';

const Root = () => {
  return (
    <div className=''>
    <Navbar></Navbar>
    <Outlet></Outlet>
    <Footer></Footer>
    </div>
  );
};

export default Root;