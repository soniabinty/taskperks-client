import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const WorkerHome = () => {
  const axiosSecure = useAxiosSecure();
  const [task, setTask] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email) { 
      axiosSecure
        .get(`/submission/worker?email=${user.email}&status=approve`)
        .then((res) => {
          console.log(res.data);
          
          setTask(res.data);
        })
       
    
    }
  }, [axiosSecure, user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Worker Home</h1>
      <div className="overflow-x-auto">
        <table className="table">
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
              <tr key={t._id}>
                <td>{idx + 1}</td>
                <td>{t.title}</td>
                <td>{t.buyer_name}</td>
                <td>${t.amount}</td>
                <td className="text-green-500">{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerHome;
