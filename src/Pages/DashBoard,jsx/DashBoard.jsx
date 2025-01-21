
import { FaAd, FaBell, FaCoins, FaHome, FaListAlt, FaUsers } from 'react-icons/fa';

import { GoTasklist } from 'react-icons/go';

import { MdAddTask, } from 'react-icons/md';
import { RiCoinsFill } from 'react-icons/ri';
import { Link, NavLink, Outlet } from 'react-router-dom';
import useUser from '../../Hooks/useUser';
import useAdmin from '../../Hooks/useAdmin';
import useBuyer from '../../Hooks/useBuyer';
import useWorker from '../../Hooks/UseWorker';
import { FaBitcoinSign, FaList, FaListCheck } from 'react-icons/fa6';


const DashBoard = () => {
  const [users] = useUser()
  const [isAdmin] = useAdmin()
  const [isBuyer] = useBuyer()
  const [isWorker] = useWorker()
 
  return (
   <div>

     <div className='min-h-screen  mx-auto flex'>

<div className=' bg-blue-500 text-white p-4 w-56 hidden md:block'>
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




</>
   

}


  </ul>

 <ul>

 </ul>

</div>

<div className='flex-1 p-5'>

<div className=''>
   
<div className="flex  items-center justify-between mb-2 ">


  <div className='p-3'>
  <div>
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
             <FaCoins className='text-yellow-600'></FaCoins> <span className="font-bold text-green-500">{users?.coins}</span>
            </p>
            <p className="text-md font-bold text-green-500">
{users?.role }
            </p>
            
          </div>
        
         
          <FaBell className="text-xl cursor-pointer text-green-500" />
        </div>
  </div>



        <Outlet></Outlet>
</div>
</div>

</div>
   </div>
  );
};

export default DashBoard;