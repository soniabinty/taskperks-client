import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../Hooks/useAuth";
import useWorker from "../Hooks/UseWorker";




const WorkerRoute = ({children}) => {
  const {user , loading} = useAuth()
  const [isWorker , isWorkerLoading] = useWorker()
  const location = useLocation()
  if(loading || isWorkerLoading){
    return <progress className="progress w-56"></progress>
  }
  if(user && isWorker)
  {
    return children
  }
  return <Navigate to='/forbidden' state={{from: location}} replace></Navigate>
};

export default WorkerRoute;