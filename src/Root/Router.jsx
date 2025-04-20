import AllTasks from "../Pages/AllTasks";
import AddTask from "../Pages/DashBoard,jsx/AddTask";
import AdminHome from "../Pages/DashBoard,jsx/AdminHome";
import BuyerHome from "../Pages/DashBoard,jsx/BuyerHome";
import DashBoard from "../Pages/DashBoard,jsx/DashBoard";
import DashboardHome from "../Pages/DashBoard,jsx/DashboardHome";
import ManageTasks from "../Pages/DashBoard,jsx/ManageTasks";
import ManageUsers from "../Pages/DashBoard,jsx/ManageUsers";
import MySubmission from "../Pages/DashBoard,jsx/MySubmission";
import MyTask from "../Pages/DashBoard,jsx/MyTask";
import PaymentHistory from "../Pages/DashBoard,jsx/PaymentHistory";
import PaymentSystem from "../Pages/DashBoard,jsx/PaymentSystem";
import PurchaseCoin from "../Pages/DashBoard,jsx/PurchaseCoin";
import TaskDetails from "../Pages/DashBoard,jsx/TaskDetails";
import TaskList from "../Pages/DashBoard,jsx/TaskList";
import Withdrawals from "../Pages/DashBoard,jsx/WithDrawals";
import WorkerHome from "../Pages/DashBoard,jsx/WorkerHome";
import About from "../Pages/Home/About";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Register/Login";
import Register from "../Pages/Register/Register";
import Forbidden from "../Shared/Forbidden";
import Profile from "../Shared/Profile";
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
    
        path: "/alltasks",
        element: <AllTasks></AllTasks>,
      },
      
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    
    
      {
        path: "about",
        element: <About></About>,
      },
    

    
    ],

    
  },

  {
    path: '/dashboard',
    element: <DashBoard></DashBoard>,
    children:[




    {
      path: '/dashboard',
      element: <DashboardHome></DashboardHome>
    },





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
        path:"payment",
        element:
        <BuyerRoute>  <PaymentHistory/>
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
        path:"withdrawals",
        element:<Withdrawals/>
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
        path:"adminhome",
        element:
        <AdminRoute>
            <AdminHome/>
        </AdminRoute>
    
      },


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


      {
        path:"profile",
        element: <Profile></Profile>
      },
     
    ]
  },
 
 {
            path:"forbidden",
            element:<Forbidden/>
          },

]);

export default router