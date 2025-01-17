import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";




const useAllTasks = () => {

  const axiosPublic =useAxiosPublic()

 
  const { refetch,data : tasks = []} = useQuery({
    queryKey: [ 'tasks' ],
    queryFn : async () =>{
      const res = await axiosPublic.get('/alltasks')
      return res.data
    }
  })
  return [tasks ,refetch]
};

export default useAllTasks;
