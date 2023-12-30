import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App'
import DisplayList from './components/DisplayList/DisplayList';
import DisplayFormData from './components/DisplayFormData/DisplayFormData';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/FormData",
    element: <DisplayFormData/>,
  },
  {
    path: "/TicketList",
    element: <DisplayList/>,
  },
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

