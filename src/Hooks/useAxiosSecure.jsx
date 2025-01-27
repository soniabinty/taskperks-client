import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

 const axiosSecure = axios.create({
  baseURL: 'https://task-perks-server.vercel.app'
})

const useAxiosSecure = () => {
  const navigate = useNavigate()
  const { signOutUser} = useAuth()

  axiosSecure.interceptors.request.use(function(config){
    const token =localStorage.getItem('access-token')
    // console.log(token)
    config.headers.authorization = `Bearer ${token}`
    return config
  } , function (error){
    return Promise.reject(error)
  })


  axiosSecure.interceptors.response.use(function(response){
    return response
  }, async (error) => {
    const status = error.response.status
    // console.log('status' , status)

    if(status === 401 || status ===400){
await  signOutUser
 navigate('/forbidden')
    }
    return Promise.reject(error)
  })
  return axiosSecure
};

export default useAxiosSecure;