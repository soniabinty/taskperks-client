
import { FaGoogle } from 'react-icons/fa6';
import useAuth from '../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../Hooks/useAxiosPublic';


const SocialLogin = () => {
  const { googleSignIn} = useAuth()
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()

  const handleGoogleLogin = () =>{
    googleSignIn()
    .then (result =>{

      console.log(result.user)
      const userInfo = {
        email : result.user?.email,
        name : result.user?.displayName ,
        photo : result.user?.photoURL
        ,
        role : 'Worker',
        coins: parseInt(10)

        
      }
      axiosPublic.post('users' , userInfo)
      .then(res =>{
        console.log(res.data)
        navigate('/dashboard')
      })

    })
  }
  return (
    <div className='px-8' >

<div className="divider">OR</div>

      <button className='btn w-full bg-[#014c57] text-white hover:bg-[#014c57]' onClick={handleGoogleLogin}><FaGoogle></FaGoogle></button>
      
    </div>
  );
};

export default SocialLogin;