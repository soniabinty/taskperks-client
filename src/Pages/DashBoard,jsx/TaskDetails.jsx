import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { FaUser } from 'react-icons/fa';

import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
const TaskDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [task, setTask] = useState(null);
  const {user} = useAuth()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()


  const onSubmit = (data) => {
    const date = new Date().toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  const submissionInfo = {

    taskId : task._id,
    title : task.title,
     buyer_email : task.email, 
     amount : task.amount,
     worker_email : user.email, 
     submission_detail : data.workers_submission,
     worker_name : user.displayName,
     buyer_name: task.buyer_name,
     status : 'pending' ,
     submission_date: date


    
     }



  console.log(submissionInfo)

   
    
axiosPublic.post('/submission' , submissionInfo)
.then(res =>{
  reset()
    
})

  
  
 



}

  useEffect(() => {
    axiosPublic.get(`/alltasks/${id}`)
      .then(res => {
        setTask(res.data);
      })
   
  }, [id]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (

    <div>
        <div className="card card-side bg-base-100 shadow-xl">
      <figure>
     
        <img className='w-56' src={task.image} alt="Task" />
      </figure>
      <div className="card-body space-y-3">
        <h2 className="card-title text-2xl text-green-600">{task.title}</h2>
        <div className='flex gap-4 bg-slate-100 p-1 rounded-lg w-2/3'>
                 <p className='flex gap-2 items-center'><FaUser></FaUser>{task.buyer_name}</p> 
                 <p className='flex gap-2'>Submision Date:{task.date}</p> 
        </div>

        <div className='flex gap-4 bg-slate-100 p-1 rounded-lg w-2/3'>
          <p className='flex gap-2 font-semibold  text-green-600'>price:${task.amount}</p> 
       
                 <p className='flex gap-2 items-center'>Worker Needed:{task.Workers}</p> 
               </div> 


        <p>{task.detail}</p> 
        <p><span className='text-green-600 font-semibold mr-2'>Have to Submit:</span>{task.submission}</p> 
        <div className="card-actions justify-end">
         
        </div>
      </div>
    </div> 

    <div className='p-8 w-2/3'>
      <h2 className='text-3xl font-semibold text-green-600 mb-8'>Submission Details:</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea  {...register("workers_submission",{ required: true })} name='workers_submission' className="textarea textarea-success w-full h-36" placeholder="Submit the Details of your Work Submission"></textarea>  
        <div className='text-end pr-2'>
      <button className='py-2 px-4 rounded-lg text-white bg-green-500'>Submit</button>
</div>

      </form>
  

      </div> 
    </div>

  );
};

export default TaskDetails;
