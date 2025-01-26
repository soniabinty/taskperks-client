import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const Navbar = () => {
  const {user ,signOutUser} = useAuth()
  const handleLogout = () =>{
    signOutUser()
  }

  const links = <>
  
        
          {
    user? 
    <>
<li> <NavLink to={'/dashboard'}>DashBoard</NavLink></li>

<li><button>Join as Developer</button></li>

</> 
 
 :
     <><li > 
     <NavLink  to={'/login'}>Login</NavLink>
 </li>
 <li> <NavLink to={'/register'}>Register</NavLink></li>
 <li><button>Join as Developer</button></li>


</>
  }
          
  </>
  return (
    <div className="navbar fixed z-40 text-white max-w-7xl py-4">
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
         {links}
        </ul>
      </div>
      <a className="btn btn-ghost text-xl">TaskParks</a>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
       {links}
      </ul>
    </div>
    <div className="navbar-end">
    <button onClick={handleLogout} className='btn'>LogOut</button>
    </div>
  </div>
  );
};

export default Navbar;