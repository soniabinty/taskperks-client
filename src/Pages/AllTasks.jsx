import React from 'react';

import { Link } from 'react-router-dom';
import useAllTasks from '../Hooks/useAllTasks';

const AllTasks = () => {
  const [tasks] = useAllTasks();

  return (
    <div className="container mx-auto md:p-6 py-12">
     

      <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-4 mt-12 pt-12 px-4">
        {tasks
          .filter(task => task.workers > 0)
          .map(task => (
            <div
              key={task._id}
              className="bg-white  rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition duration-300"
            >

<img className="w-full h-[180px]" src={task.image} alt="" />
            
      
      
              <div className="p-2 flex flex-col grow">
     <h2 className="text-xl font-semibold text-[#014c57] mb-2">
       {task.title}
     </h2>
     {/* Time and Icon */}
     <div className="mb-2">
      
     <div className="flex justify-between items-center bg-gray-50  rounded-md 
mb-1">
   <span className="font-medium text-gray-700">Workers Needed:</span>
   <span className="font-semibold text-gray-800">{task.workers}</span>
 </div>
 <div className="flex justify-between items-center bg-gray-50  rounded-md 
mb-1">
   <span className="font-medium text-gray-700">Completion Date:</span>
   <span className="font-semibold text-blue-500">{task.date}</span>
 </div>
      
      
     </div>
     {/* Content and Button */}
     <div className="flex grow justify-between items-center">
       <p className="text-lg font-bold text-[#014c57]">
         ${task.amount} Coin
       </p>
       <Link to={`/dashboard/tasklist/${task._id}`}>
         <button className="bg-[#014c57] btn-sm text-white rounded-md mt-2">
           View Details
         </button>
       </Link>
     </div>
   </div>

      


      
      
      
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllTasks;
