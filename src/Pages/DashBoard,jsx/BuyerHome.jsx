import React from 'react';
import useSubmisson from '../../Hooks/useSubmisson';

const BuyerHome = () => {
  const [submissionData] = useSubmisson();
  console.log(submissionData);

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
          <button className='btn-xs bg-green-500 rounded-lg text-white'>Approve</button>
          <button className='btn-xs bg-red-500 rounded-lg text-white'>Reject</button>
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
