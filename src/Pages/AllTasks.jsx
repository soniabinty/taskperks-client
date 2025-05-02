import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAllTasks from '../Hooks/useAllTasks';

const AllTasks = () => {
  const [tasks, refetch] = useAllTasks();
  const [searchQuery, setSearchQuery] = useState('');
  const [amountFilter, setAmountFilter] = useState('');

  const filteredTasks = tasks
    .filter((task) => task.workers > 0)
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((task) =>
      amountFilter ? task.amount >= parseFloat(amountFilter) : true
    );

  return (
    <div className="container mx-auto lg:p-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-black mt-16">
        All Available Tasks
      </h1>

      {/* Search and Filter Inputs */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 px-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full sm:max-w-xs"
        />
        <input
          type="number"
          placeholder="Min Coin Amount"
          value={amountFilter}
          onChange={(e) => setAmountFilter(e.target.value)}
          className="input input-bordered w-full sm:max-w-xs"
        />
      </div>

      {/* Tasks Grid */}
      <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-4 lg:px-4">
        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition duration-300"
          >
            <img className="w-full h-[180px]" src={task.image} alt="" />
            <div className="p-2 flex flex-col grow">
              <h2 className="text-xl font-semibold text-[#014c57] mb-2">{task.title}</h2>
              <div className="mb-2">
                <div className="flex justify-between items-center bg-gray-50 rounded-md mb-1">
                  <span className="font-medium text-gray-700">Workers Needed:</span>
                  <span className="font-semibold text-gray-800">{task.workers}</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 rounded-md mb-1">
                  <span className="font-medium text-gray-700">Completion Date:</span>
                  <span className="font-semibold text-blue-500">{task.date}</span>
                </div>
              </div>
              <div className="flex grow justify-between items-center">
                <p className="text-lg font-bold text-[#014c57]">${task.amount} Coin</p>
                <Link to={`/dashboard/tasklist/${task._id}`}>
                  <button className="bg-[#014c57] btn-sm text-white rounded-md mt-2">View Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTasks;
