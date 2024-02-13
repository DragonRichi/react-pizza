/* eslint-disable react-refresh/only-export-components */
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom'
import { Cart } from './pages/Cart/Cart.tsx'
import { ErrorPage } from './pages/ErrorPage/ErrorPage.tsx'
import { Layout } from './Components/Layout/Layout.tsx'
import { Product } from './pages/Product/Product.tsx'
import { API_URL } from './helpers/const.ts'
import { Suspense, lazy } from 'react'
import { AuthLayout } from './Components/Layout/Auth/AuthLayout.tsx'
import { Login } from './pages/Login/Login.tsx'
import { Register } from './pages/Register/Register.tsx'
import { RequireAuth } from './helpers/RequireAuth.tsx'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import axios from 'axios'
import './index.css'
import "normalize.css"
import { Success } from './pages/Success/Success.tsx'

const Menu = lazy(() => import("./pages/Menu/Menu.tsx"))

const router = createBrowserRouter([
  {
    path: "/",
    element: <RequireAuth><Layout /></RequireAuth>,
    children: [
      {
        path: "/",
        element: <Suspense fallback={<>Загрузка...</>}><Menu /></Suspense>
      },
      {
        path: "/success",
        element: <Success />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/product/:id",
        element: <Product />,
        errorElement: <div>Ошибка получения товара</div>,
        loader: async ({ params }) => {
          return defer({
            data: new Promise((resolve, reject) => {
              setTimeout(() => {
                axios.get(`${API_URL}/products/${params.id}`).then(data => resolve(data)).catch(e => reject(e))
              }, 2000)
            })
          })
        }
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage />
  }
], { basename: "/react-pizza" })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store} >
    <RouterProvider router={router} />
  </Provider>
)
