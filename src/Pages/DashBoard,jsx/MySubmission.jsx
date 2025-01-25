import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const MySubmission = () => {
  const axiosSecure = useAxiosSecure();
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useAuth();
  const limit = 10; 

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/submission/workeralltask?email=${user.email}&page=${currentPage}&limit=${limit}`)
        .then((res) => {
          setTasks(res.data.submissions);
          setTotalPages(res.data.totalPages);
        })
        .catch((error) => {
          console.error("Error fetching submissions:", error);
        });
    }
  }, [axiosSecure, user, currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
            {tasks.length > 0 ? (
              tasks.map((t, idx) => (
                <tr
                  key={t._id}
                  className={`text-gray-700 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-100 transition-all`}
                >
                  <td className="px-6 py-4">{(currentPage - 1) * limit + idx + 1}</td>
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

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`px-4 py-2 rounded-lg ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MySubmission;
