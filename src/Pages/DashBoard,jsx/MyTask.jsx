import React, { useState } from 'react';
import useTask from '../../Hooks/useTask';
import { FaClock, FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import useUser from '../../Hooks/useUser';

const MyTask = () => {
  const [tasks, refetch] = useTask();
  const axiosSecure = useAxiosSecure();
  
  const [users] = useUser();

  // Handle task update
  const handleUpdate = (task) => {
    Swal.fire({
      title: 'Update Task',
      html: `
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <input id="title" class="swal2-input" value="${task.title}" placeholder="Task Title" style="padding: 10px; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem;">
          <textarea id="detail" class="swal2-textarea" placeholder="Task Details" style="padding: 10px; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem; resize: vertical;"></textarea>
          <input id="submission" class="swal2-input" value="${task.submission}" placeholder="Submission Info" style="padding: 10px; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem;">
        </div>
      `,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Update Task',
      focusConfirm: false,
      confirmButtonColor: '#4CAF50',
      cancelButtonColor: '#F44336',  
      preConfirm: () => {
        const title = document.getElementById('title').value;
        const detail = document.getElementById('detail').value;
        const submission = document.getElementById('submission').value;
  
        if (!title || !detail || !submission) {
          Swal.showValidationMessage('All fields are required');
          return false;
        }
  
        return { title, detail, submission };
      },
      customClass: {
        popup: 'popup-custom', 
        title: 'title-custom', 
        input: 'input-custom', 
        cancelButton: 'cancel-button-custom', 
        confirmButton: 'confirm-button-custom', 
      },
      backdrop: true, 
      showLoaderOnConfirm: true, 
    }).then((result) => {
      if (result.isConfirmed) {
        const { title, detail, submission } = result.value;
        axiosSecure
          .patch(`/tasks/${task._id}`, { title, detail, submission })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire('Success', 'Task updated successfully', 'success');
            }
          })
          .catch((err) => console.error('Update failed:', err));
      }
    });
  };

  // Handle task delete
  const handleDelete = (task) => {
    const workers = task.workers;
    const amount = task.amount;
    const refundAmount = parseInt(workers * amount);
    const newAmount = users.coins + refundAmount;

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/tasks/${task._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
            
              if (!task.completed) {
                axiosSecure
                  .patch(`/users_coin/${users._id}`, { coins: newAmount })
                  .then(() => {
                    refetch();
                    Swal.fire('Deleted!', 'Task deleted and coins refunded.', 'success');
                  })
                  .catch((err) => console.error('Refund failed:', err));
              } else {
                refetch();
                Swal.fire('Deleted!', 'Task deleted successfully.', 'success');
              }
            }
          })
          .catch((err) => console.error('Delete failed:', err));
      }
    });
  };

  return (
    <div className="space-y-5 md:mx-8">
      {tasks
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((task) => (
          <div key={task._id} className="flex flex-col lg:flex-row justify-between items-center rounded-lg shadow-xl p-5 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 hover:shadow-2xl transition-all duration-300 ease-in-out">
            <div className="space-y-2 w-full lg:w-3/4">
              <h2 className="text-2xl font-semibold text-green-600 hover:text-green-800 transition-all duration-200">{task.title}</h2>
              <p className="text-gray-600">{task.detail}</p>
              <p className="text-gray-500 flex items-center gap-2">
                <FaClock /> {task.date}
              </p>

              <div className="flex gap-6">
                <button onClick={() => handleUpdate(task)} className="text-green-600 hover:text-green-800 transition-all duration-200">
                  <FaEdit className="text-xl" />
                </button>
                <button onClick={() => handleDelete(task)} className="text-red-600 hover:text-red-800 transition-all duration-200">
                  <FaTrash className="text-xl" />
                </button>
              </div>
            </div>

            <div className="flex justify-between mt-4 md:mt-0 gap-4 w-full lg:w-1/4">
              <div className="flex p-2 rounded-md bg-green-500 text-white shadow-lg hover:bg-green-600 transition-all duration-200">
                <div className="text-center border-r-2 px-2">
                  <h2 className="font-bold">{task.workers}</h2>
                  <h2>Workers</h2>
                </div>
                <div className="text-center px-2">
                  <h2 className="font-bold">${task.amount}</h2>
                  <h2>Price</h2>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MyTask;
