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
   <div className='p-6 mx-auto w-11/12 text-center'>

<h2 className='text-2xl font-semibold'>We're glad to see you again!
</h2>
<p>
Don't have an account?<Link className='text-green-500' to={'/register'}>Register !</Link></p>

      <div className="card bg-base-100 w-full mx-auto max-w-xl ">
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
              <a href="#" className="label-text-alt link link-hover text-red-600">Forgot password?</a>
            </label>
          </div>

          <div className="form-control mt-6">
            <button  className="btn bg-green-500 text-white hover:bg-green-500">Login</button>
          </div>
        </form>
       

        <SocialLogin></SocialLogin>
      </div>
   </div>
  );
};

export default Login;