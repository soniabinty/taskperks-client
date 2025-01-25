import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useUser from '../../Hooks/useUser';


const TaskDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [task, setTask] = useState(null);
  const { user } = useAuth();
const [users] = useUser()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axiosPublic
      .get(`/alltasks/${id}`)
      .then((res) => {
        setTask(res.data);
      })
      .catch((err) => console.error("Error fetching task details:", err));
  }, [id]);

  if (!task) {
    return <div className="text-center text-xl font-semibold text-gray-500">Loading Task Details...</div>;
  }

  const onSubmit = (data) => {
    const date = new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const submissionInfo = {
      taskId: task._id,
      title: task.title,
      buyer_email: task.email,
      amount: task.amount,
      worker_email: user.email,
      submission_detail: data.workers_submission,
      worker_name: user.displayName,
      buyer_name: task.buyer_name,
      status: "pending",
      submission_date: date,
      coins : parseFloat(users.coin)
    };

    axiosPublic.post("/submission", submissionInfo).then(() => reset());

    axiosPublic
      .patch(`/alltasks/${task._id}`, { workers: task.workers - 1 })
      .then((res) => console.log("Task updated:", res.data));
  };

  return (
    <div className="container mx-auto md:p-8">
      {/* Task Details Section */}
      <div className="card bg-gradient-to-br from-blue-50 to-white shadow-lg rounded-lg overflow-hidden">
        <figure className="p-6">
          <img className="w-56 mx-auto rounded-lg shadow-md" src={task.image} alt={task.title} />
        </figure>
        <div className="card-body p-6 space-y-4">
          <h2 className="text-3xl font-bold text-blue-600">{task.title}</h2>
          <div className="flex flex-wrap md:gap-4 bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="flex items-center gap-2 text-gray-700">
              <FaUser className="text-blue-500" /> <span>{task.buyer_name}</span>
            </p>
            <p className="text-gray-600">
              <strong>Submission Date:</strong> {task.date}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-lg font-semibold text-blue-600">Price: ${task.amount}</p>
            <p className="text-gray-700">
              <strong>Workers Needed:</strong> {task.workers}
            </p>
          </div>
          <p className="text-gray-600">{task.detail}</p>
          <p className="text-blue-600 font-semibold">
            <strong>Have to Submit:</strong> {task.submission}
          </p>
        </div>
      </div>

 
      <div className="mt-10 bg-gray-50 p-8 rounded-lg shadow-md">
        <h2 className="md:text-3xl font-bold text-blue-600 mb-6">Submission Details</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register("workers_submission", { required: "Submission details are required" })}
            className="textarea textarea-bordered w-full h-36 mb-4 p-4 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-200 shadow-inner"
            placeholder="Enter details about your work submission..."
          ></textarea>
          {errors.workers_submission && (
            <p className="text-red-500 text-sm mb-4">{errors.workers_submission.message}</p>
          )}
          <div className="text-right">
            <button
              type="submit"
              className="py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetails;
