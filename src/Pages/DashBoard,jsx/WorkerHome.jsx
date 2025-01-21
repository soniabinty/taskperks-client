import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const WorkerHome = () => {
  const axiosSecure = useAxiosSecure();
  const [task, setTask] = useState([]);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [pendingSubmissions, setPendingSubmissions] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/submission/worker?email=${user.email}`)
        .then((res) => {
          const allTasks = res.data;
          setTask(allTasks);

          // Calculate stats
          const totalSubmissionsCount = allTasks.length;
          const pendingCount = allTasks.filter(task => task.status === 'pending').length;
          const earnings = allTasks
            .filter(task => task.status === 'approve')
            .reduce((total, task) => total + task.amount, 0);

          setTotalSubmissions(totalSubmissionsCount);
          setPendingSubmissions(pendingCount);
          setTotalEarnings(parseFloat(earnings));
        })
        .catch((err) => console.error('Error fetching submissions:', err));
    }
  }, [axiosSecure, user]);

  if (!user) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">Welcome to Your Dashboard, {user.name}!</h1>

      <div className="md:grid md:grid-cols-3 gap-6">
        {/* Stats Section */}
        <div className="stats-item p-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-lg shadow-xl text-center">
          <h2 className="text-2xl font-semibold">Total Submissions</h2>
          <p className="text-xl mt-2">{totalSubmissions}</p>
        </div>
        <div className="stats-item p-6 bg-gradient-to-r from-teal-400 via-blue-500 to-green-500 text-white rounded-lg shadow-xl text-center">
          <h2 className="text-2xl font-semibold">Pending Submissions</h2>
          <p className="text-xl mt-2">{pendingSubmissions}</p>
        </div>
        <div className="stats-item p-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white rounded-lg shadow-xl text-center">
          <h2 className="text-2xl font-semibold">Total Earnings</h2>
          <p className="text-xl mt-2">${totalEarnings.toFixed(2)}</p>
        </div>
      </div>

      {/* Approved Submissions Table */}
      <div className="overflow-x-auto mt-10">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Approved Submissions</h3>
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 md:px-6 md:text-left">Task Title</th>
              <th className="py-3 px-6 text-left">Buyer</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {task
              .filter((t) => t.status === "approve")
              .map((t, idx) => (
                <tr key={t._id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-6">{idx + 1}</td>
                  <td className="py-3 px-6">{t.title}</td>
                  <td className="py-3 px-6">{t.buyer_name}</td>
                  <td className="py-3 px-6">${t.amount}</td>
                  <td className="py-3 px-6 text-green-500 font-semibold">{t.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerHome;
