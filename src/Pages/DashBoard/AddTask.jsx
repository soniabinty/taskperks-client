import React from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';

const AddTask = () => {

  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => console.log(data)
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
{...register("Submission")}
type="text"
placeholder="Submission Info"
className="input input-bordered input-success w-full max-w-xs" />

</div>

   
<textarea className="textarea  textarea-success w-full" placeholder="Task Details"></textarea>



<div className='flex justify-between my-6 '>
<input
color='green-500'
  type="file"
  className="file-input file-input-bordered   file-input-success w-full max-w-xs" />
<button className='btn w-1/3 bg-green-500 hover:bg-green-500 text-white'><FaPlus></FaPlus> Add Task</button>
</div>


    </form>

   
      
    </div>
  );
};

export default AddTask;