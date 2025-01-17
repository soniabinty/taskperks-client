import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";




const useOneTask = (id) => {

  const axiosPublic =useAxiosPublic()

 
  const { refetch,data : task = []} = useQuery({
    queryKey: [ 'task' ],
    queryFn : async () =>{
      const res = await axiosPublic.get(`/alltasks/${id}`)
      return res.data
    }
  })
  return [task ,refetch]
};

export default  useOneTask;