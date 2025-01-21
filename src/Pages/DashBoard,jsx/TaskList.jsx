import React from 'react';
import useAllTasks from '../../Hooks/useAllTasks';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks] = useAllTasks();

  return (
    <div className="container mx-auto md:p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Available Tasks</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tasks
          .filter(task => task.workers > 0)
          .map(task => (
            <div
              key={task._id}
              className="bg-white p-5 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition duration-300"
            >
              <h2 className="text-xl font-semibold text-green-600 mb-2">{task.title}</h2>
              <p className="text-gray-700 mb-4">
                <span className="font-medium">Buyer:</span> {task.buyer_name}
              </p>

              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md mb-4">
                <span className="font-medium text-gray-700">Workers Needed:</span>
                <span className="font-semibold text-gray-800">{task.workers}</span>
              </div>

              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md mb-4">
                <span className="font-medium text-gray-700">Completion Date:</span>
                <span className="font-semibold text-blue-500">{task.date}</span>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-green-500">${task.amount} Coin</p>
                <Link to={`/dashboard/tasklist/${task._id}`}>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TaskList;
