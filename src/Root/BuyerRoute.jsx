import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../Hooks/useAuth";
import useBuyer from "../Hooks/useBuyer";



const BuyerRoute = ({children}) => {
  const {user , loading} = useAuth()
  const [isBuyer , isBuyerLoading] = useBuyer()
  const location = useLocation()
  if(loading || isBuyerLoading){
    return <progress className="progress w-56"></progress>
  }
  if(user && isBuyer)
  {
    return children
  }
  return <Navigate to='/forbidden' state={{from: location}} replace></Navigate>
};

export default BuyerRoute;