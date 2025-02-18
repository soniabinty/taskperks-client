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
      <h1 className="text-4xl font-bold mb-4">Best Workers</h1>
      <p className="text-lg text-gray-600">Connecting you with the best workers for your tasks</p>
    </header>

    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-6xl mx-auto"
    >
    
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-10">
        {workers.map(worker => (
          <motion.div
            key={worker._id}
            className=" rounded-2xl shadow-sm p-2  hover:border hover:border-[#014c57] hover:shadow-xl transition-shadow duration-300 flex gap-4 items-center"
            whileHover={{ scale: 1.05 }}
          >
            <div>
                 <img
              src={worker.photo}
              alt={worker.name}
              className="w-20 h-20  mx-auto mb-4 object-cover"
            />
            </div>
            <div>
           
            <h3 className="text-xl font-medium mb-2 uppercase">{worker.name}</h3>
            <p className="text-gray-500 mb-2">Coins: <span className="text-[#014c57] font-bold">{worker.coins}</span></p>   
            </div>
         
          </motion.div>
        ))}
      </div>
    </motion.section>
  </div>
  );
};

export default BestWorker;