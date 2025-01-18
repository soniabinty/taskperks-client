import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const MySubmission = () => {
  const axiosSecure = useAxiosSecure();
  const [task, setTask] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/submission/workeralltask?email=${user.email}`)
        .then((res) => {
          console.log(res.data);
          setTask(res.data);
        })
        .catch((error) => {
          console.error("Error fetching submissions:", error);
        });
    }
  }, [axiosSecure, user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Submissions</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Task Title</th>
              <th>Buyer</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {task.map((t, idx) => (
              <tr key={t._id} className="hover">
                <td>{idx + 1}</td>
                <td>{t.title}</td>
                <td>{t.buyer_name}</td>
                <td>${t.amount}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded ${
                      t.status === "approve"
                        ? "bg-green-200 text-green-700"
                        : t.status === "reject"
                        ? "bg-red-300 text-red-800"
                        : "bg-yellow-200 text-yellow-700"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySubmission;
