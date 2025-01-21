import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useWorker = () => {
  const axiosSecure = useAxiosSecure()
  const {user} =useAuth()
  const { data : isWorker , isPending : isWorkerLoading} = useQuery({
    queryKey: [ 'isWorker' , user?.email],
    queryFn : async () =>{
      const res = await axiosSecure.get(`/users/worker/${user.email}`)

      console.log('worker' , res.data)
      return res.data?.worker
    }
  })

  return [isWorker ,isWorkerLoading]
};

export default useWorker;