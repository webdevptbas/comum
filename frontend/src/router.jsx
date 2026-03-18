import { createBrowserRouter } from "react-router";
import MainLayout from "./Layout";
import HomePage from "./Pages/Home/Home";
import BrandPage from "./Pages/Brand/Brand";
import CommunityPage from "./Pages/Community/Community";
import CoffeePage from "./Pages/Coffee/Coffee";
import ErrorPage from "./Pages/ErrorPage";
import ArticleDetails from "./Component/CommunityComponent/ArticleList/ArticleDetail";
import ArticleListPage from "./Pages/ArticleListPage/ArticleListPage";
import ServicePage from "./Pages/Service/Service";
import ProductDetailPage from "./Pages/Shop/ProductDetail.jsx";
import SimulatorPage from "./Pages/Simulator/Simulator";
import CartPage from "./Pages/Cart/Cart.jsx";
import ShopPage from "./Pages/Shop/Shop";
import LoginPage from "./Pages/Login/Login.jsx";
import RegisterPage from "./Pages/Register/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "shop/:brand/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/brands",
        element: <BrandPage />,
      },
      {
        path: "/community",
        element: <CommunityPage />,
      },
      {
        path: "/community/article",
        element: <ArticleListPage />,
      },
      {
        path: "/community/article/:slug",
        element: <ArticleDetails />,
      },
      {
        path: "/coffee",
        element: <CoffeePage />,
      },
      {
        path: "/simulator",
        element: <SimulatorPage />,
      },
      {
        path: "/service",
        element: <ServicePage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
]);

export default router;
