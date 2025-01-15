
import { FaGoogle } from 'react-icons/fa6';
import useAuth from '../Hooks/useAuth';


const SocialLogin = () => {
  const { googleSignIn} = useAuth()


  const handleGoogleLogin = () =>{
    googleSignIn()
    .then (result =>{

      console.log(result.user)
  

    })
  }
  return (
    <div className='px-8' >

<div class="divider">OR</div>

      <button className='btn w-full bg-green-500 text-white hover:bg-green-500' onClick={handleGoogleLogin}><FaGoogle></FaGoogle></button>
      
    </div>
  );
};

export default SocialLogin;