import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Contact from './views/Contact/Contact.tsx';
import Event from './views/Event/Event.tsx';
import Home from './views/Home/Home.tsx';
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/events/:eventId",
    element: <Event />
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
