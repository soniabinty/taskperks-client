import React from 'react';
import useAllTasks from '../../Hooks/useAllTasks';
import { Link } from 'react-router-dom';


const TaskList = () => {
  const [tasks] = useAllTasks()


  return (
    <div className='md: grid grid-cols-3 gap-6'>
      {
        tasks.map(task =>
          <div className=' p-4 rounded-lg shadow-xl space-y-2 ' key={task._id}>

         
             
              <h2 className=' text-xl text-green-600'>{task.title}</h2>
              
 <h3 className=' text-gray-600'>{task. buyer_name}</h3>
              <div className='flex justify-between bg-slate-100 items-center p-2'>
                <h6>
Worker Need
                </h6>
         <p > {task.Workers}</p>       
              </div>
              
              <div className='flex justify-between  items-center '>
                <h6>
Submission
                </h6>
         <p className='text-green-500'> {task.date}</p>       
              </div>

          

  <div className='flex items-center justify-between'>
             <p className='flex gap-1 text-xl  items-center text-green-500'>$ {task.amount} USD</p> 
             <Link to={`/dashboard/tasklist/${task._id}`}> <button className="btn bg-green-500 text-white hover:bg-green-500">View Details</button>
             </Link> 
           
            </div>

          
           

         
          
          </div>
        )
      }
      
    </div>
  );
};

export default TaskList;