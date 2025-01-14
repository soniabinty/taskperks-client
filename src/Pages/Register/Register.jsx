

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
    <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Sign Up now!</h1>
        <p className="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
          quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>
      </div>
      <div className="card bg-base-100 w-full max-w-sm  shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">


        <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input  {...register("name",{ required: true })} type="text" name='name' placeholder="name" className="input input-bordered" required />
            {errors.name && <span>Name is required</span>}
          </div>


          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input  {...register("photo",{ required: true })} type="text" name='photo' placeholder="name" className="input input-bordered" required />
            {errors.photo && <span>photo is required</span>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input  {...register("email",{ required: true }) } type="email" name='email' placeholder="email" className="input input-bordered" required />
            {errors.email && <span>Email is required</span>}
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
            {errors.password?.type === 'required' && <span>Password is required</span>}
            {errors.password?.type === 'minLength' && <span>Password must be 6 character</span>}
            {/* {errors.password?.type === 'pattern' && <span>Password must be one upercase one lowercase</span>} */}
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary">Register</button>
          </div>
        </form>

        <p>Already Have an account?<Link to={'/login'}>Login</Link></p>

        <SocialLogin></SocialLogin>
      </div>
    </div>
  </div>
);
};

export default Register;