import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current location

  // Function to fetch users
  const fetchUsers = () => {
    setLoading(true); // Set loading to true while fetching
    axiosSecure.get("/allusers")
      .then(res => {
        setUsers(res.data);
        setLoading(false);  // Set loading to false after fetching data
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false); // Stop loading if there's an error
        Swal.fire({
          title: "Error!",
          text: "There was an error fetching user data.",
          icon: "error",
        });
      });
  };

  // Trigger refetch when tab/page changes or location changes
  useEffect(() => {
    fetchUsers(); // Call fetchUsers every time the location changes
  }, [location]); // Dependency on location to refetch on tab/page change

  // Handle role change
  const handleRoleChange = (id, newRole) => {
    axiosSecure.patch(`/allusers/${id}`, { role: newRole }).then((res) => {
      if (res.data.modifiedCount > 0) {
        fetchUsers(); // Re-fetch after role update
        Swal.fire({
          title: "Success!",
          text: `User role updated to ${newRole}.`,
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "There was an issue updating the user's role.",
          icon: "error",
        });
      }
    }).catch((err) => {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: "There was an issue updating the user's role.",
        icon: "error",
      });
    });
  };

  // Handle user deletion
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
        axiosSecure.delete(`/allusers/${id}`).then((res) => {
          if (res.data.deletedCount) {
            fetchUsers(); // Re-fetch users after deletion
            Swal.fire({
              title: "Deleted!",
              text: "The user has been deleted.",
              icon: "success",
            });
          }
        }).catch((err) => {
          console.error("Error deleting user:", err);
          Swal.fire({
            title: "Error!",
            text: "There was an issue deleting the user.",
            icon: "error",
          });
        });
      }
    });
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Manage Users
      </h1>

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="table-auto w-full border-collapse border border-gray-300">
            {/* Table Head */}
            <thead>
              <tr className="bg-blue-100 text-blue-800">
                <th className="px-6 py-3 border-b border-gray-300 text-left">Name</th>
                <th className="px-6 py-3 border-b border-gray-300 text-left">Email</th>
                <th className="px-6 py-3 border-b border-gray-300 text-left">Role</th>
                <th className="px-6 py-3 border-b border-gray-300 text-left">Coins</th>
                <th className="px-6 py-3 border-b border-gray-300 text-left">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className={`hover:bg-blue-50 ${
                    users.indexOf(user) % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-4 border-b border-gray-300">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={user.photo} alt="User Avatar" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">{user.email}</td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    <span className="font-semibold">{user.role}</span>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-green-600 font-bold">
                    {user.coins}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 flex items-center gap-4">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="select select-bordered bg-gray-100 focus:outline-none border-green-500"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Buyer">Buyer</option>
                      <option value="Worker">Worker</option>
                    </select>
                    <button
                      className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
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
      )}
    </div>
  );
};

export default ManageUsers;
