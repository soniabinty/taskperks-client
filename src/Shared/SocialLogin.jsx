
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
    <div className='px-6' >

      <button className='btn w-full bg-blue-300' onClick={handleGoogleLogin}><FaGoogle></FaGoogle></button>
      
    </div>
  );
};

export default SocialLogin;