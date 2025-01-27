import useAdmin from "../../Hooks/useAdmin";
import useBuyer from "../../Hooks/useBuyer";
import useWorker from "../../Hooks/UseWorker";
import AdminHome from "./AdminHome";
import BuyerHome from "./BuyerHome";
import WorkerHome from "./WorkerHome";


const DashboardHome = () => {
  const [isAdmin]= useAdmin()
  const [isBuyer]= useBuyer()
  const [isWorker]= useWorker()
  return (
    <div>
      {
        isAdmin && <AdminHome></AdminHome>
      }
      {
        isBuyer && <BuyerHome></BuyerHome>
      }
      {
        isWorker && <WorkerHome></WorkerHome>
      }
    </div>
  );
};

export default DashboardHome;