import React from 'react';
import useTask from '../../Hooks/useTask';
import { FaClock, FaEdit, FaTrash } from 'react-icons/fa';

import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';



const MyTask = () => {

  const [tasks , refetch] = useTask()
  const axiosSecure = useAxiosSecure()

  const handleDelete = id =>{

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
     
axiosSecure.delete(`/tasks/${id}`)
.then(res=>{
if(res.data.deletedCount){

  refetch()
     Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
}
})
      }
    });

  }

  return (
  <div className='space-y-5 mx-8'>


    {
      tasks.sort((a, b) => new Date(b.date) - new Date(a.date)).map(task => 

  <div key={task._id} className=' flex justify-between items-center rounded-lg shadow-lg p-5'>

      <div className='space-y-2 '>
        <h2 className='text-2xl font-semibold text-green-500'>{task.title}</h2>
        <p className='text-gray-500'>{task.detail}</p>
        <p className='text-gray-500 flex items-center gap-2'><FaClock></FaClock> {task.date}</p>
         
        <div className='flex gap-6'>
         <button > <FaEdit className='text-green-500'></FaEdit></button>
          <button onClick={() => handleDelete(task._id)}><FaTrash className='text-red-600'></FaTrash></button>

        </div>
      </div>

      <div className=''>
        <div className='flex  p-2 rounded-md bg-green-500 text-white'>
<div className='   text-center border-r-2 px-2'>
  <h2>{task.Workers}</h2>
          <h2>Workers</h2>
</div>
<div className=' text-center px-2 '>
  <h2>${task.amount}</h2>
          <h2>Prices</h2>
</div>
          

        </div>

      </div>

    </div>

      )
    }
  
  </div>
  );
};

export default MyTask;