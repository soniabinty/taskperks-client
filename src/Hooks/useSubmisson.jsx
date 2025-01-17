import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useSubmisson = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: submissionData = [], refetch } = useQuery({
    queryKey: ["submission"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submission?email=${user.email}`);
      return res.data;
    },
  });
  return [submissionData, refetch];
};

export default useSubmisson;