import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {

  RouterProvider,
} from "react-router-dom";
import router from './Root/Router';

import AuthProvider from './Provider/AuthProvider';

createRoot(document.getElementById('root')).render(
 <AuthProvider>

    <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>,
 </AuthProvider>

)
