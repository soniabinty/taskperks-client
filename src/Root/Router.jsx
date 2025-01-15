import AddTask from "../Pages/DashBoard/AddTask";
import DashBoard from "../Pages/DashBoard/DashBoard";
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
        ]
      }
    ],

    
  },


]);

export default router