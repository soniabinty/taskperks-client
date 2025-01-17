import React from 'react';
import useSubmisson from '../../Hooks/useSubmisson';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const BuyerHome = () => {
  const [submissionData , refetch] = useSubmisson();
  console.log(submissionData);
  const axiosSecure = useAxiosSecure();
 
  const updateStatus = async (id, newStatus) => {
    axiosSecure
      .patch(`/submission/${id}`, {
        status: newStatus,
      
      })
      .then((res) => {
        console.log(res.data);
          refetch();
      });
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
       axiosSecure.delete(`/submission/${id}`).then((res) => {
          console.log(res.data);
        
          if (res.data.deletedCount > 0) {
              refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Blood request deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };


  return (
    <div>
        
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Worker Name</th>
        <th>Task Title</th>
        <th>Price</th>
        <th >Actions</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}

      {submissionData.map((task , idx) => (
    

<tr key={task._id}>
        <th>{idx+1}</th>
        <td>{task.worker_name}</td>
        <td>{task.title}</td>
        <td>${task.amount}</td>
        <td className=''>
          
          <div className='flex gap-4'><button className='btn-xs bg-green-500 rounded-lg text-white'>View Submission</button>

          
          <button  onClick={() => updateStatus(task._id, "approve")}
 className='btn-xs bg-green-500 rounded-lg text-white'
 disabled={task.status === "approve"}
>Approve</button>

          <button
                onClick={() => handleDelete(task._id)}
                className='btn-xs bg-red-500 rounded-lg text-white'>Reject</button>
            </div></td>
      </tr>


))}
     
    </tbody>
  </table>
</div>
    
    </div>
  );
};

export default BuyerHome;
