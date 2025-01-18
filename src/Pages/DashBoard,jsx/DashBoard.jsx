
import { FaHome, FaList, FaSearch, FaUsers } from 'react-icons/fa';
import { FaBook, FaCalendar, FaCartShopping } from 'react-icons/fa6';
import { GoTasklist } from 'react-icons/go';
import { ImSpoonKnife } from 'react-icons/im';
import { MdAddTask, MdAddToPhotos, MdOutlineReviews, MdPayments } from 'react-icons/md';
import { RiCoinsFill } from 'react-icons/ri';
import { NavLink, Outlet } from 'react-router-dom';
import useUser from '../../Hooks/useUser';


const DashBoard = () => {
  const [users] = useUser()

 
  return (
   <div>


    <h1>{users.email}</h1>
    <h2>{users.coins}</h2>
     <div className='min-h-screen  m-6 mx-auto flex'>

<div className=' bg-green-500 text-white p-4 w-56'>


  <ul className='space-y-3'>




<>
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


      <li><NavLink  to={'/dashboard/workerhome'}> 
   <div className='flex items-center gap-1'>
   <FaHome>
    
    </FaHome>
    Home
   </div>
      </NavLink></li>


      <li><NavLink  to={'/dashboard/mysubmission'}> 
   <div className='flex items-center gap-1'>
   <FaHome>
    
    </FaHome>
    My Submission
   </div>
      </NavLink></li>



      <li ><NavLink to={'/dashboard/tasklist'}> 
      <div className='flex items-center gap-1'>
   
     TaskList
</div>
      </NavLink></li>


<li ><NavLink to={'/dashboard/managetask'}> 
      <div className='flex items-center gap-1'>
   
     Manage Tasks
</div>
      </NavLink></li>

      <li ><NavLink to={'/dashboard/manageuser'}> 
      <div className='flex items-center gap-1'>
   
     Manage Users
</div>
      </NavLink></li>


</>
   
  </ul>

</div>

<div className='flex-1 p-5'>

<Outlet></Outlet>
</div>

</div>
   </div>
  );
};

export default DashBoard;