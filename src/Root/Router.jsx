import AddTask from "../Pages/DashBoard,jsx/AddTask";
import BuyerHome from "../Pages/DashBoard,jsx/BuyerHome";
import DashBoard from "../Pages/DashBoard,jsx/DashBoard";
import MyTask from "../Pages/DashBoard,jsx/MyTask";
import TaskDetails from "../Pages/DashBoard,jsx/TaskDetails";
import TaskList from "../Pages/DashBoard,jsx/TaskList";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Register/Login";
import Register from "../Pages/Register/Register";
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

      {
        path: 'dashboard',
        element: <DashBoard></DashBoard>,
        children:[
          {
            path:"tasks",
            element:<AddTask/>
          },
          {
            path:"mytask",
            element:<MyTask/>
          },
          {
            path:"tasklist",
            element:<TaskList/>
          },
          {
            path:"buyerhome",
            element:<BuyerHome/>
          },

          {
            path:"tasklist/:id",
            element:<TaskDetails/>
          },
        ]
      }
    ],

    
  },


]);

export default router