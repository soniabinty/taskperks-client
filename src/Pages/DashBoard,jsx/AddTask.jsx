import React from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useUser from '../../Hooks/useUser';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_image_hosting_apikey;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddTask = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { register, handleSubmit , reset } = useForm();
  const [users ] = useUser();
  const coins = users.coins;
  const userId = users._id;

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const totalPayable = parseFloat(data.workers) * parseFloat(data.amount);

      if (totalPayable > coins) {
        alert('Not enough coins. Please purchase more coins.');
        navigate('/dashboard/paymentsystem');
        return;
      }

      const remainingCoin = parseFloat(coins - totalPayable);
      console.log('remanaing coin up' ,remainingCoin)

      const imageFile = {image : data.image[0]}
    const res = await axiosPublic.post(image_hosting_api , imageFile ,{
      headers: {
        'content-type' : 'multipart/form-data'
      }
    })


      if (res?.data?.success) {
        const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        const task = {
          title: data.title,
            workers: parseFloat(data.workers),
          date: formattedDate,
          detail: data.detail,
          submission: data.submission,
          amount: parseFloat(data.amount),
          image: res.data.data.display_url,
          email: user.email,
          buyer_name: user.displayName,
        };

        Swal.fire({
          title: 'Success!',
          text: 'Task added successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
   reset()

        const taskRes = await axiosSecure.post('/tasks', task);
        console.log('coin inside function', remainingCoin )
         console.log(userId)
        if (taskRes?.data?.insertedId) {


        
          const coinUpdateRes = await axiosSecure.patch(`/users_coin/${userId}`, { coins: remainingCoin });
          console.log('coin inside coin fnc', remainingCoin)
          if (coinUpdateRes?.data?.status === 'success') {
            alert('Task added successfully!');
          
          } else {
            console.error('Failed to update coins:', coinUpdateRes?.data);
          }
        } else {
          console.error('Failed to add task:', taskRes?.data);
        }
      } else {
        console.error('Image upload failed:', res?.data);
      }
    } catch (error) {
      console.error('Error occurred:', error.message);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl shadow-lg p-6 rounded-lg border-t-4 border-b-4 border-green-500">
      {/* Heading */}
      <h1 className="text-2xl lg:text-3xl font-bold text-center text-green-500 mb-6">Add New Task</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap lg:flex-nowrap gap-5 mb-6">
          <input
            {...register('title')}
            type="text"
            placeholder="Task Title"
            className="input input-bordered input-success flex-1"
          />
          <input
            {...register('workers')}
            type="number"
            placeholder="Required Workers"
            className="input input-bordered input-success flex-1"
          />
        </div>

        <div className="flex flex-wrap lg:flex-nowrap gap-5 mb-6">
          <input
            {...register('amount')}
            type="number"
            placeholder="Payable Amount"
            className="input input-bordered input-success flex-1"
          />
          <input
            {...register('date')}
            type="date"
            className="input input-bordered input-success flex-1"
          />
          <input
            {...register('submission')}
            type="text"
            placeholder="Submission Info"
            className="input input-bordered input-success flex-1"
          />
        </div>

        <textarea
          {...register('detail')}
          className="textarea textarea-success w-full mb-6"
          placeholder="Task Details"
        ></textarea>

        <div className="flex flex-wrap lg:flex-nowrap justify-between items-center gap-5">
          <input
            {...register('image')}
            type="file"
            className="file-input file-input-bordered file-input-success w-full lg:w-auto"
          />
          <button className="btn bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 w-full lg:w-auto">
            <FaPlus /> Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
