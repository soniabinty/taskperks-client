import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {

  const axiosSecure = useAxiosSecure()
  const {user} =useAuth()
 
  const { refetch,data : users = []} = useQuery({
    queryKey: [ 'users'],
    queryFn : async () =>{
      const res = await axiosSecure.get(`/users?email=${user.email}`)
      return res.data
    }
  })
  return [users ,refetch]
};


export default useUser;