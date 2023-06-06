import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Create from './pages/Create';
import Update from './pages/Update';
import ErrorPage from './pages/ErrorPage';

// Create the router const
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/crear',
    element: <Create />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/actualizar/:id',
    element: <Update />,
    errorElement: <ErrorPage />,
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
