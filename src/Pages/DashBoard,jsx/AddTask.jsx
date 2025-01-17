import React from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
const image_hosting_key = import.meta.env.VITE_image_hosting_apikey
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddTask = () => {
const axiosPublic = useAxiosPublic()
const axiosSecure = useAxiosSecure()
const {user} = useAuth()
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {

  
  
    const imageFile = {image : data.image[0]}
    const res = await axiosPublic.post(image_hosting_api , imageFile ,{
      headers: {
        'content-type' : 'multipart/form-data'
      }
    })

    if(res.data.success){

      const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const tasks = {

        title : data.title ,
        Workers :  parseFloat(data.workers),
        date: formattedDate,
        detail :data.detail,
       submission : data.submission,
       amount: data.amount,
       image : res.data.data.display_url,
      email : user.email ,
      buyer_name : user.displayName
  
      }

      const tasksJob = await axiosSecure.post('/tasks' , tasks)
      console.log(tasksJob.data)
    }

  }
  return (
    <div className='mx-auto w-11/12 shadow-lg p-6 rounded-lg border-t-4 border-b-4 border-green-500  '>

<form onSubmit={handleSubmit(onSubmit)}>

  <div className='flex gap-5 mb-6 '>

  <input
{...register("title")}
  type="text"
  placeholder="Task Title"
  className="input input-bordered input-success w-full max-w-lg" />
<input
{...register("workers")}
  type="number"
  placeholder="Required Workers"
  className="input input-bordered input-success w-full max-w-lg" />

  </div>

  <div className='flex gap-5 mb-6'>

<input
{...register("amount")}
type="number"
placeholder="Payable Amount"
className="input input-bordered input-success w-full max-w-xs" />
<input
{...register("date")}
type="date"
placeholder="Completion Date"
className="input input-bordered input-success w-full max-w-xs" />


<input
{...register("submission")}
type="text"
placeholder="Submission Info"
className="input input-bordered input-success w-full max-w-xs" />

</div>

   
<textarea {...register("detail")} className="textarea  textarea-success w-full" placeholder="Task Details"></textarea>



<div className='flex justify-between my-6 '>
<input
{...register("image")}

  type="file"
  className="file-input file-input-bordered   file-input-success w-full max-w-xs" />
<button className='btn w-1/3 bg-green-500 hover:bg-green-500 text-white'><FaPlus></FaPlus> Add Task</button>
</div>


    </form>

   
      
    </div>
  );
};

export default AddTask;