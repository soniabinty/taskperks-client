import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { motion } from 'framer-motion';


const BestWorker = () => {
  const axiosPublic = useAxiosPublic()
  const [workers, setWorkers] = useState([]);
  console.log(workers)
  useEffect(() => {
    
    axiosPublic.get('/top-workers') 
      .then(res => {
        setWorkers(res.data);
      })
      .catch(error => {
        console.error('Error fetching workers:', error);
      });
  }, []);
  return (
    <div className="p-6 mt-10">
    <header className="text-center mb-10">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
      <p className="text-lg text-gray-600">Connecting you with the best workers for your tasks</p>
    </header>

    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-6xl mx-auto"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">Best Workers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {workers.map(worker => (
          <motion.div
            key={worker._id}
            className="bg-white rounded-2xl shadow-lg p-4 text-center hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={worker.photo}
              alt={worker.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-medium mb-2">{worker.name}</h3>
            <p className="text-gray-500 mb-2">Coins: <span className="text-green-500 font-bold">{worker.coins}</span></p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  </div>
  );
};

export default BestWorker;