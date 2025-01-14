import React, { useContext } from 'react';


import { Link} from 'react-router-dom';

import useAuth from '../../Hooks/useAuth';
import SocialLogin from '../../Shared/SocialLogin';
const Login = () => {



 const {signIn} = useAuth()



  const handleLogin = event =>{
    event.preventDefault()
    const form = event.target
    const email =form.email.value 
    const password =form.password.value 
    console.log(email , password)
    signIn(email ,password)
    .then(result =>{
      const user = result.user
      console.log(user)
 
  
    }) 
  }



  return (
    <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <p className="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
          quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>
      </div>
      <div className="card bg-base-100 w-full max-w-sm  shadow-2xl">
        <form onSubmit={handleLogin} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>

          <div className="form-control mt-6">
            <button  className="btn btn-primary">Login</button>
          </div>
        </form>
       
        <p>New in TaskPerks?<Link to={'/register'}>Register Now</Link></p>

        <SocialLogin></SocialLogin>
      </div>
    </div>
  </div>
  );
};

export default Login;