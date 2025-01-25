
import { FaAd, FaBell, FaCoins, FaHome, FaListAlt, FaUsers } from 'react-icons/fa';

import { GoTasklist } from 'react-icons/go';

import { MdAddTask, } from 'react-icons/md';
import { RiCoinsFill } from 'react-icons/ri';
import { Link, NavLink, Outlet } from 'react-router-dom';
import useUser from '../../Hooks/useUser';
import useAdmin from '../../Hooks/useAdmin';
import useBuyer from '../../Hooks/useBuyer';
import useWorker from '../../Hooks/UseWorker';
import { FaBitcoinSign, FaList, FaListCheck, FaMoneyBill } from 'react-icons/fa6';


import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';



const DashBoard = () => {
  const [users] = useUser()
  const [isAdmin] = useAdmin()
  const [isBuyer] = useBuyer()
  const [isWorker] = useWorker()

  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/notifications?toEmail=${user.email}`) // Fetch notifications for the user
        .then((res) => setNotifications(res.data))
        .catch((err) => console.error("Error fetching notifications:", err));
    }
  }, [user, axiosSecure]);

  const togglePopup = (e) => {
    e.stopPropagation();
    setShowPopup(!showPopup);
  };

  const hidePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    document.addEventListener("click", hidePopup);
    return () => document.removeEventListener("click", hidePopup);
  }, []);
 
  return (
    <div className="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col">
      <div className="flex-none lg:hidden">
        <label
          htmlFor="my-drawer-2"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className='md:p-7'>
           
<div className="flex  items-center justify-between mb-2 ">


<div className='p-3'>
<div >
           <img
          src={users.photo}
          alt="User"
          className="w-12 h-12 rounded-full border-2 border-green-500"
        />
        <p className="text-md font-bold">
       {users?.name }
       
          </p>
        </div>
</div>

<div className='flex gap-7 px-5 '>
            <div>
          <p className="text-md flex gap-2 itens-center ">
           <FaCoins className='text-yellow-600'></FaCoins> <span className="font-bold text-green-500">{parseInt(users?.coins)}</span>
          </p>
          <p className="text-md font-bold text-green-500">
{users?.role }
          </p>
          
        </div>
      
        <div className="relative">
                <FaBell
                  className="text-xl cursor-pointer text-green-500"
                  onClick={togglePopup}
                />
                {/* {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-xs text-white w-5 h-5 rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                )} */}
                {showPopup && (
                  <div
                    className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 shadow-lg rounded-lg z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {notifications.length > 0 ? (
                      notifications.map((notification, idx) => (
                        <div
                          key={idx}
                          className="p-4 hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            window.location.href = notification.actionRoute
                          }
                        >
                          <p className="text-sm text-gray-700">
                            {notification.message}
                          </p>
                          <span className="text-xs text-gray-500">
                            {new Date(notification.time).toLocaleString()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-4">
                        No notifications
                      </p>
                    )}
                  </div>
                )}
              </div>
      </div>
</div>
          <Outlet></Outlet>
      </div>
    
    </div>
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>

<div>
  <div className='min-h-screen'>

  <div className=' bg-blue-500 text-white p-4 w-56 min-h-screen'>
<div className="flex items-center gap-4">
          <div className="font-bold text-lg mb-4">
            <Link to={'/'}>Logo</Link></div>
        </div>

  <ul className='space-y-3'>




{
  isAdmin &&  <> 

<li><NavLink  to={'/dashboard/adminhome'}> 
   <div className='flex items-center gap-1'>
   <FaHome>
    
    </FaHome>
    Home
   </div>
      </NavLink></li>
  
        <li ><NavLink to={'/dashboard/manageuser'}> 
        <div className='flex items-center gap-1'>
     <FaUsers></FaUsers>
       Manage Users
  </div>
        </NavLink></li>


        <li ><NavLink to={'/dashboard/managetask'}> 
        <div className='flex items-center gap-1'>
     <FaList></FaList>
       Manage Tasks
  </div>
        </NavLink></li>
  </>
 
}



{

  isBuyer && <>

<li><NavLink  to={'/dashboard/buyerhome'}> 
   <div className='flex items-center gap-1'>
   <FaHome>
    
    </FaHome>
    Home
   </div>
      </NavLink></li>

    <li ><NavLink to={'/dashboard/tasks'}> 
<div className='flex items-center gap-1'>
<MdAddTask />
Add New Tasks
</div>

  </NavLink></li>  

      <li ><NavLink to={'/dashboard/mytask'}>
      <div className='flex items-center gap-1'>
      <GoTasklist />
      My Task's
</div>
      </NavLink></li>

           
      <li ><NavLink to={'/dashboard/purchase'}> 
      <div className='flex items-center gap-1'>
      <RiCoinsFill />
     Purchase Coin
</div>
      </NavLink></li>

      <li ><NavLink to={'/dashboard/payment'}> 
      <div className='flex items-center gap-1'>
      <RiCoinsFill />
     Payment History
</div>
      </NavLink></li>
  
  </>

}


{
isWorker &&

<>
 

      <li><NavLink  to={'/dashboard/workerhome'}> 
   <div className='flex items-center gap-1'>
   <FaHome>
    
    </FaHome>
    Home
   </div>
      </NavLink></li>





      <li ><NavLink to={'/dashboard/tasklist'}> 
      <div className='flex items-center gap-1'>
   <FaListAlt></FaListAlt>
     TaskList
</div>
      </NavLink></li>


      <li><NavLink  to={'/dashboard/mysubmission'}> 
   <div className='flex items-center gap-1'>
 <FaListCheck></FaListCheck>
    My Submission
   </div>
      </NavLink></li>


      <li><NavLink  to={'/dashboard/withdrawals'}> 
   <div className='flex items-center gap-1'>
 <FaMoneyBill></FaMoneyBill>
 WithDrawals
   </div>
      </NavLink></li>


</>
   

}


  </ul>

 <ul>

 </ul>

</div>


  </div>
</div>




      
    
    </div>
  </div>
  );
};

export default DashBoard;