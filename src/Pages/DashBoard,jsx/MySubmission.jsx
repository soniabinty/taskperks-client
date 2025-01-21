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
    return (
      <div className="flex items-center justify-center h-40">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          <p className="mt-4 text-lg font-semibold text-gray-600">
            Loading submissions...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 via-white to-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-8">
        My Submissions
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">#</th>
              <th className="px-6 py-3 text-left font-semibold">Task Title</th>
              <th className="px-6 py-3 text-left font-semibold">Buyer</th>
              <th className="px-6 py-3 text-left font-semibold">Price</th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {task.length > 0 ? (
              task.map((t, idx) => (
                <tr
                  key={t._id}
                  className={`text-gray-700 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-100 transition-all`}
                >
                  <td className="px-6 py-4">{idx + 1}</td>
                  <td className="px-6 py-4">{t.title}</td>
                  <td className="px-6 py-4">{t.buyer_name}</td>
                  <td className="px-6 py-4">${t.amount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        t.status === "approve"
                          ? "bg-green-200 text-green-800"
                          : t.status === "rejected"
                          ? "bg-red-300 text-red-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-lg font-medium text-gray-500 py-8"
                >
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySubmission;
