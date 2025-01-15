

import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import useAuth from '../../Hooks/useAuth';
import SocialLogin from '../../Shared/SocialLogin';

const Register = () => {

  const navigate = useNavigate()
  const{createUser , updateProfileUser } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()
 
  const onSubmit = (data) => {
    createUser(data.email , data.password)
    .then(result =>{
      const user = result.user
      console.log(user)


      updateProfileUser(data.name , data.photo)
   

    


     
      })
   
  }
  
  return (
    <div className='p-6 mx-auto w-11/12 text-center'>

    <h2 className='text-2xl font-semibold'>Let's create your account!


    </h2>
    <p>
    Already have an account?<Link className='text-green-500' to={'/login'}>Login !</Link></p>
    
    <div className="card bg-base-100 w-full max-w-xl  mx-auto text-start ">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">


        <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input  {...register("name",{ required: true })} type="text" name='name' placeholder="name" className="input input-bordered" required />
            {errors.name && <span className='pl-1 text-red-600'>Name is required!</span>}
          </div>


          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input  {...register("photo",{ required: true })} type="text" name='photo' placeholder="name" className="input input-bordered" required />
            {errors.photo && <span className='pl-1 text-red-600'>Photo is required!</span>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input  {...register("email",{ required: true }) } type="email" name='email' placeholder="email" className="input input-bordered" required />
            {errors.email && <span className='pl-1 text-red-600'>Email is required!</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input  {...register("password",{ required: true, 
              minLength:6 ,
               maxLength: 20 , 
              //  pattern: /^[A-Za-z]+$/i 
               }) } type="password" name='password' placeholder="password" className="input input-bordered" required />
            {errors.password?.type === 'required' && <span className='pl-1 text-red-600'>Password is required!</span>}
            {errors.password?.type === 'minLength' && <span className='pl-1 text-red-600'>Password must be 6 character!</span>}
            {/* {errors.password?.type === 'pattern' && <span>Password must be one upercase one lowercase</span>} */}
          </div>

          <div className="form-control mt-6">
            <button className="btn hover:bg-green-500 bg-green-500 text-white">Register</button>
          </div>
        </form>


        <SocialLogin></SocialLogin>
      </div>
       </div>
);
};

export default Register;