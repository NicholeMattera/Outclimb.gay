import Contact from './views/Contact/Contact.tsx'
import Event from './views/Event/Event.tsx'
import Events from './views/Events/Events.tsx'
import Home from './views/Home/Home.tsx'
import NotFound from './views/NotFound/NotFound.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import './index.scss'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/events',
        element: <Events />,
    },
    {
        path: '/events/:eventId',
        element: <Event />,
    },
    {
        path: '/contact',
        element: <Contact />,
    },
    {
        path: '/404',
        element: <NotFound />,
    },
    {
        path: '*',
        element: <Navigate to="/404" replace />,
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
