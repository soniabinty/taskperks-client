import React from "react";
import useAllTasks from "../../Hooks/useAllTasks";
import { FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageTasks = () => {
  const axiosSecure = useAxiosSecure();
  const [tasks, refetch] = useAllTasks();

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
        axiosSecure.delete(`/alltasks/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "The task has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-blue-600">Manage Tasks</h2>
        <p className="text-lg text-gray-600">Total Tasks: {tasks.length}</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="table-auto w-full border-collapse border border-gray-300">
          {/* Table Head */}
          <thead>
            <tr className="bg-blue-100 text-blue-800">
              <th className="px-6 py-3 border-b border-gray-300 text-left">#</th>
              <th className="px-6 py-3 border-b border-gray-300 text-left">Task Title</th>
              <th className="px-6 py-3 border-b border-gray-300 text-left">Buyer Name</th>
              <th className="px-6 py-3 border-b border-gray-300 text-left">Price</th>
              <th className="px-6 py-3 border-b border-gray-300 text-left">Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {tasks.map((task, idx) => (
              <tr
                key={task._id}
                className={`hover:bg-blue-50 ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-4 border-b border-gray-300">{idx + 1}</td>
                <td className="px-6 py-4 border-b border-gray-300 font-semibold">
                  {task.title}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">{task.buyer_name}</td>
                <td className="px-6 py-4 border-b border-gray-300 text-green-600 font-bold">
                  ${task.amount}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn btn-sm bg-red-500 hover:bg-red-600 text-white flex items-center gap-2 px-3 py-1 rounded"
                  >
                    <FaTrashAlt />
                    <span>Delete</span>
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

export default ManageTasks;
