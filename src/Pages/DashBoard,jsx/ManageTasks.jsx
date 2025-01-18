import React from 'react';
import useAllTasks from '../../Hooks/useAllTasks';
import { FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageTasks = () => {
const axiosSecure = useAxiosSecure()
  const [tasks , refetch] = useAllTasks()
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
     
axiosSecure.delete(`/alltasks/${id}`)
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
    <div className='p-6'>


    <div className='flex justify-evenly'>
      <h2 className='text-4xl' >Total Tasks:{tasks.length}</h2>
    
     
    </div>

    <div className="overflow-x-auto">
<table className="table">
  {/* head */}
  <thead>
    <tr>
      <th>
     #
      </th>
      <th>Task Title</th>
      <th>Buyer Name</th>
      <th>PRICE</th>
      <th>ACTION</th>
    </tr>
  </thead>
  <tbody>
    {/* row 1 */}

    {
    tasks.map((task , idx) => <tr key={task._id}>
      <th>
      {idx+1}
      </th>
      <td>
      {task.buyer_name}
      </td>
      <td>
       {task.title}
      </td>
      <td>${task.amount}</td>
      <th>
        <button onClick={() => handleDelete(task._id)} className="btn btn-ghost btn-xs">
          <FaTrashAlt className='text-red-700'></FaTrashAlt>
        </button>
      </th>
    </tr> )
    }
   
   

  </tbody>

</table>
</div>
    
  </div>
   
  );
};

export default ManageTasks;