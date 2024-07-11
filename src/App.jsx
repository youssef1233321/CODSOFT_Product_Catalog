import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./Layout/Layout"
import Home from "./Pages/Home"
import { ProductContextProvider } from "./Context/ProductsContext"
import ProductDetails from "./Pages/ProductDetails"
import Cart from "./Pages/Cart"




function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          index:true,
          element:<Home/>
        },
        {
          path:"/products/:productId",
          element:<ProductDetails/>
        },
        {
           path:"/cart",
           element:<Cart/>
        }
      ]
    }
  ])

  return (
    <>
    <ProductContextProvider>
        <RouterProvider router={router} />
    </ProductContextProvider>
    
    </>
  )
}

export default App
