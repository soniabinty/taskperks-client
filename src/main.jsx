import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {

  RouterProvider,
} from "react-router-dom";
import router from './Root/Router';
import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()
import AuthProvider from './Provider/AuthProvider';

createRoot(document.getElementById('root')).render(

  
 <AuthProvider>
<QueryClientProvider client={queryClient}>
<StrictMode>
<RouterProvider router={router} />
</StrictMode>,

 </QueryClientProvider>,
</AuthProvider>

   

)
