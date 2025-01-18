import React from "react";
import useSubmisson from "../../Hooks/useSubmisson";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const BuyerHome = () => {
  const [submissionData, refetch] = useSubmisson();
  const axiosSecure = useAxiosSecure();

  const updateStatus = async (id, newStatus) => {
    axiosSecure
      .patch(`/submission/${id}`, {
        status: newStatus,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Updated!",
            text: `Task has been ${newStatus}.`,
            icon: "success",
          });
        }
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reject this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus(id, "rejected");
      }
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Buyer Home</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Worker Name</th>
              <th>Task Title</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissionData.map((task, idx) => (
              <tr key={task._id}>
                <td>{idx + 1}</td>
                <td>{task.worker_name}</td>
                <td>{task.title}</td>
                <td>${task.amount}</td>
                <td>
                  <div className="flex gap-4">
                    <button className="btn-xs bg-blue-500 rounded-lg text-white">
                      View Submission
                    </button>
                    <button
                      onClick={() => updateStatus(task._id, "approve")}
                      className="btn-xs bg-green-500 rounded-lg text-white"
                      disabled={task.status === "approve"}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(task._id)}
                      className="btn-xs bg-red-500 rounded-lg text-white"
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
    </div>
  );
};

export default BuyerHome;
