import React, { useState, useEffect } from "react";
import useSubmisson from "../../Hooks/useSubmisson";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useTask from "../../Hooks/useTask";
import useAuth from "../../Hooks/useAuth";
import useUser from "../../Hooks/useUser";

const BuyerHome = () => {
  const [submissionData, refetch] = useSubmisson();
  const axiosSecure = useAxiosSecure();
  const [tasks] = useTask();
  const [task, setTask] = useState([]);
  const { user } = useAuth();
  const [users] = useUser();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPayment, setTotalPayment] = useState(0); // State for total payment

  // Fetch pending tasks
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/submission/buyer?email=${user.email}&status=pending`)
        .then((res) => {
          setTask(res.data);
        });
    }
  }, [axiosSecure, user]);

  // Fetch payment data and calculate total payment
  useEffect(() => {
    if (users?.email) {
      axiosSecure
        .get(`/payments?email=${users.email}`)
        .then((res) => {
          setPayments(res.data);
          setLoading(false);

          // Calculate total payment
          const total = res.data.reduce((sum, payment) => sum + payment.amount, 0);
          setTotalPayment(total);
        })
        .catch(() => setLoading(false));
    }
  }, [axiosSecure, users.email]);

  const [modalData, setModalData] = useState(null);

  const updateStatus = async (id, newStatus) => {
    axiosSecure
      .patch(`/submission/${id}`, { status: newStatus })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          if (newStatus === "approve") {
            // Increase worker coins here (example API call)
            axiosSecure.patch(`/increase-coin/${id}`);
          } else if (newStatus === "rejected") {
            // Increase required workers
            // axiosSecure.patch(`/increase-workers/${id}`);
          }
          Swal.fire({
            title: "Updated!",
            text: `Submission has been ${newStatus}.`,
            icon: "success",
          });
        }
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Buyer Home</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-green-100 text-center rounded-lg shadow">
          <h2 className="text-lg font-bold">Total Tasks</h2>
          <p className="text-2xl">{tasks.length}</p>
        </div>
        <div className="p-4 bg-yellow-100 text-center rounded-lg shadow">
          <h2 className="text-lg font-bold">Pending Tasks</h2>
          <p className="text-2xl">{task.length}</p>
        </div>
        <div className="p-4 bg-blue-100 text-center rounded-lg shadow">
          <h2 className="text-lg font-bold">Total Payment</h2>
          {loading ? (
            <p className="text-2xl">Loading...</p>
          ) : (
            <p className="text-2xl">${totalPayment.toFixed(2)}</p>
          )}
        </div>
      </div>

      {/* Submissions Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Worker Name</th>
              <th className="border border-gray-300 px-4 py-2">Task Title</th>
              <th className="border border-gray-300 px-4 py-2">Payable Amount</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissionData.map((task, idx) => (
              <tr
                key={task._id}
                className="hover:bg-gray-100 transition duration-200"
              >
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {idx + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {task.worker_name}
                </td>
                <td className="border border-gray-300 px-4 py-2">{task.title}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  ${task.amount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button
                      className="btn-sm max-sm:btn-xs bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                      onClick={() => setModalData(task)}
                    >
                      View Submission
                    </button>
                    <button
                      onClick={() => updateStatus(task._id, "approve")}
                      className={`btn-sm max-sm:btn-xs text-white px-4 py-1 rounded ${
                        task.status === "approve"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                      disabled={task.status === "approve"}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(task._id, "rejected")}
                      className={`btn-sm max-sm:btn-xs text-white px-4 py-1 rounded ${
                        task.status === "rejected"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                      disabled={task.status === "rejected"}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Submission Details */}
      {modalData && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
          onClick={() => setModalData(null)}
        >
          <div
            className="bg-white rounded-lg p-6 w-11/12 md:w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">Submission Details</h3>
            <p><strong>Worker Name:</strong> {modalData.worker_name}</p>
            <p><strong>Task Title:</strong> {modalData.title}</p>
            <p><strong>Amount:</strong> ${modalData.amount}</p>
            <p><strong>Details:</strong> {modalData.submission_detail || "No details provided"}</p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => setModalData(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerHome;
