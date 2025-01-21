import AddTask from "../Pages/DashBoard,jsx/AddTask";
import BuyerHome from "../Pages/DashBoard,jsx/BuyerHome";
import DashBoard from "../Pages/DashBoard,jsx/DashBoard";
import ManageTasks from "../Pages/DashBoard,jsx/ManageTasks";
import ManageUsers from "../Pages/DashBoard,jsx/ManageUsers";
import MySubmission from "../Pages/DashBoard,jsx/MySubmission";
import MyTask from "../Pages/DashBoard,jsx/MyTask";
import PaymentSystem from "../Pages/DashBoard,jsx/PaymentSystem";
import PurchaseCoin from "../Pages/DashBoard,jsx/PurchaseCoin";
import TaskDetails from "../Pages/DashBoard,jsx/TaskDetails";
import TaskList from "../Pages/DashBoard,jsx/TaskList";
import WorkerHome from "../Pages/DashBoard,jsx/WorkerHome";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Register/Login";
import Register from "../Pages/Register/Register";
import Forbidden from "../Shared/Forbidden";
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import Root from "./Root";
import {
  createBrowserRouter,

} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },

    
    ],

    
  },

  {
    path: 'dashboard',
    element: <DashBoard></DashBoard>,
    children:[


      // buyer route
      {
        path:"tasks",
        element:<BuyerRoute>     <AddTask/>
        </BuyerRoute>
   
      },
      {
        path:"mytask",
        element:
        <BuyerRoute>  <MyTask/>
        </BuyerRoute>
 
      },


      {
        path:"purchase",
        element:
        <BuyerRoute>  <PurchaseCoin/>
        </BuyerRoute>
 
      },

      {
        path:"paymentsystem",
        element:
        <BuyerRoute>  <PaymentSystem/>
        </BuyerRoute>
 
      },

{
        path:"buyerhome",
        element:
        <BuyerRoute> <BuyerHome/>
        </BuyerRoute>
   
      },

// worker home
      {
        path:"tasklist",
        element:<TaskList/>
      },
     
      {
        path:"workerhome",
        element:<WorkerHome/>
      },
      {
        path:"mysubmission",
        element:<MySubmission/>
      },

{
        path:"tasklist/:id",
        element:<TaskDetails/>
      },


      // admin route

      {
        path:"managetask",
        element:
        <AdminRoute>
            <ManageTasks/>
        </AdminRoute>
    
      },

      {
        path:"manageuser",
        element:<AdminRoute>
           <ManageUsers/>
        </AdminRoute>
       
      },


    
     
    ]
  },
 
 {
            path:"forbidden",
            element:<Forbidden/>
          },

]);

export default router