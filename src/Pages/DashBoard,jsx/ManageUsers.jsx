import React from 'react';
import useAllUsers from '../../Hooks/useAllUsers';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const [users , refetch] = useAllUsers();
  const axiosSecure =useAxiosSecure()

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
       
  axiosSecure.delete(`/allusers/${id}`)
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

    const handleRoleChange = (id, newRole) => {
      axiosSecure
        .patch(`/allusers/${id}`, { role: newRole })
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Success!",
              text: `User role updated to ${newRole}.`,
              icon: "success",
            });
          }
        })
   
       
       
    };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* Table Head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Coins</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photo}
                          alt="User Avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.coins}</td>
                <td className='flex gap-6 items-center'>

                <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="select select-bordered border-green-500"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Buyer">Buyer</option>
                    <option value="Worker">Worker</option>
                  </select>
                  <button
                    className="btn btn-ghost btn-xs bg-red-500"
                    onClick={() => handleDelete(user._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default ManageUsers;

