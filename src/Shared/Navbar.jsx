import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import { FaCoins } from 'react-icons/fa';
import useUser from '../Hooks/useUser';


const Navbar = () => {
  const {user ,signOutUser} = useAuth()
  const [users] = useUser()

  const handleLogout = () =>{
    signOutUser()
  }
  const handleClick = () => {
    window.open(
      "https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-soniabinty",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const links = <>
  
        
          {
    user? 
    <>

<li> <NavLink to={'/dashboard'}>DashBoard</NavLink></li>
<li>
<button
      onClick={handleClick}
      className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-300"
    >
      Join as Developer
    </button>
</li>

<li>
<button onClick={handleLogout} className='px-4 py-2'>LogOut</button>
</li>


</> 
 
 :
 
     <><li > 
     <NavLink  to={'/login'}>Login</NavLink>
 </li>
 <li> <NavLink to={'/register'}>Register</NavLink></li>
<li>
<button
      onClick={handleClick}
      className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-300"
    >
      Join as Developer
    </button>
</li>

</>
  }
          
  </>
  return (
    <div className="navbar fixed z-40 bg-black bg-opacity-30 text-white max-w-7xl py-4">
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
          className="menu menu-sm dropdown-content bg-green-500 rounded-box z-[1] mt-3 w-52 p-2 shadow">
         {links}
        </ul>
      </div>
      <Link to='/' className="btn btn-ghost text-xl">TaskParks</Link>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
       {links}
      </ul>
    </div>
    <div className="navbar-end">

    {
      user &&   <p className="text-md flex gap-2 bg-white rounded-full p-2 itens-center  mr-2">
      <FaCoins className='text-yellow-600'></FaCoins> <span className="font-bold text-green-500">{parseInt(users?.coins)}</span>
     </p>
     
    }

    {
      user &&        <div >
      <img
     src={users.photo}
     alt="User"
     className="w-12 h-12 rounded-full border-2 border-green-500"
   />
 
   </div>
    }
      
         
       </div>
  </div>
  );
};

export default Navbar;