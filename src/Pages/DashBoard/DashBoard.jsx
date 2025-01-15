
import { FaHome, FaList, FaSearch, FaUsers } from 'react-icons/fa';
import { FaBook, FaCalendar, FaCartShopping } from 'react-icons/fa6';
import { GoTasklist } from 'react-icons/go';
import { ImSpoonKnife } from 'react-icons/im';
import { MdAddTask, MdAddToPhotos, MdOutlineReviews, MdPayments } from 'react-icons/md';
import { RiCoinsFill } from 'react-icons/ri';
import { NavLink, Outlet } from 'react-router-dom';


const DashBoard = () => {

 
  return (
    <div className='min-h-screen  m-6 mx-auto flex'>

      <div className=' bg-green-500 text-white p-4 w-56'>


        <ul className='space-y-3'>


 
 
   <>
         <li><NavLink  to={'/dashboard/user'}> 
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



            <li ><NavLink to={'dashboard/mytask'}>
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
  </>




         
        </ul>

      </div>

      <div className='flex-1 p-5'>

<Outlet></Outlet>
      </div>
      
    </div>
  );
};

export default DashBoard;