import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import Home from "./pages/home/Home";
import ProductList from "./components/productList/ProductList";
import ProductDetails from "./components/productDetails/productDetails";
import ProductAdd from "./components/productAdd/ProductAdd";
import ProductEdit from "./components/productEdit/ProductEdit";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/product-list",
          element: <ProductList />,
        },
        {
          path: "/product-details/:id",
          element: <ProductDetails />,
        },
        {
          path: "/product-edite/:id",
          element: <ProductEdit />,
        },
        {
          path: "/product-add",
          element: <ProductAdd />,
        },
      ],
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
