import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import { FaCoins } from 'react-icons/fa';
import useUser from '../Hooks/useUser';
import { TbCoin } from 'react-icons/tb';


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
    <div className='text-white md:flex items-center gap-6'>
    <li> <Link to={'/'}>Home</Link></li>
    <li> <Link to={'/alltasks'}>All Tasks</Link></li>
    <li> <Link to={'/dashboard'}>DashBoard</Link></li>
    <li> <Link to={'/about'}>About Us</Link></li>
<li>

<button
      onClick={handleClick}
      className=" py-2 text-white "
    >
      Join as Developer
    </button>
</li>
    </div>

<div className='md:hidden text-white'>
<button onClick={handleLogout} className='px-3
'>LogOut</button>
</div>



</> 
 
 :
 
     <>
    <li> <Link to={'/'}>Home</Link></li>
    <li> <Link to={'/alltasks'}>All Tasks</Link></li>
<li> <Link to={'/about'}>About Us</Link></li>


<li>
<button
      onClick={handleClick}
      className=" py-2 
      "
    >
      <Link> Join as Developer
      </Link>
      
    </button>
</li>




<div className='md:hidden'>
<li > 
      
      <Link  to={'/login'}>Login</Link>
  </li>
  <li> <Link to={'/register'}>Register</Link></li>

</div>




</>
  }
          
  </>
  return (
    <div className="navbar fixed z-40 bg-[#014c57]  text-white md:px-6 lg:px-14 ">
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
          className="menu menu-sm dropdown-content bg-slate-400 rounded-box z-[1] mt-3 w-52 p-2 shadow">
         {links}
        </ul>
      </div>
      <Link to='/' className="btn btn-ghost text-xl">TaskParks</Link>
    </div>
    <div className="navbar-center hidden lg:flex items-center">
      <ul className="flex px-1 gap-4 items-center">
       {links}
      </ul>
    </div>
    <div className="navbar-end mr-4">

    {
      user &&   <p className="text-md items-center flex gap-1  rounded-full p-2 itens-center  mr-2">
    <TbCoin
    className='text-yellow-600'/><span className="font-bold text-white">{parseInt(users?.coins)}</span>
     </p>
     
    }

    {
      user &&        <div >
      <img
     src={users.photo}
     alt="User"
     className="w-12 h-12 rounded-full border-2 border-white"

   />
 
   </div>
    }
    <div className='hidden md:flex'>
    {
   user && 
   <button onClick={handleLogout} className='px-4 py-2 ml-3 text-white bg-[#014c57] btn 
border-white border'>LogOut</button>
  
   
 }



 {
  !user && <>
    
    <div className='hidden md:flex gap-3'>
    <Link  to={'/login'}>Login</Link>
<Link to={'/register'}>Register</Link>
    </div>
  
 
  
  </>
 }
    </div>
     
     
     
     
     
     
         
       </div>
  </div>
  );
};

export default Navbar;