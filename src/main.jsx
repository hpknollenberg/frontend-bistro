import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom'

// project styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import About from './About'
import App from './App'
import ErrorPage from './ErrorPage'
import Header from './Header'
import Footer from './Footer'
import Drinks from './Drinks'
import Appetizers from './Appetizers'
import Dinner from './Dinner'
import Breakfast from './Breakfast'
import Lunch from './Lunch'
import Contact from './Contact'
import Cart from './Cart'




function Layout() {
  return (
      <>
        <Header />
        <div id='page-content'>
          <Outlet />
        </div>
        <Footer />
      </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/appetizers',
        element: <Appetizers />
      },
      {
        path: '/dinner',
        element: <Dinner />
      },
      {
        path: '/drinks',
        element: <Drinks />
      },
      {
        path: '/breakfast',
        element: <Breakfast />
      },
      {
        path: '/lunch',
        element: <Lunch />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/cart',
        element: <Cart />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
