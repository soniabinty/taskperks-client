import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { motion } from 'framer-motion';

const BestWorker = () => {
  const axiosPublic = useAxiosPublic();
  const [workers, setWorkers] = useState([]);
  
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
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-10">
          {workers.map(worker => (
            <motion.div
              key={worker._id}
              className="flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
            >
          
          <img className='w-40 h-40' src={worker.photo} alt="" />
         <div className = ' border-b-4 rounded-b-lg border-[#014c57]  w-full text-center'>
         <h3 className="font-medium  uppercase">{worker.name}</h3>
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
