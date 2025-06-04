import { createBrowserRouter } from "react-router";
import MainLayout from "./Layout";
import HomePage from "./Pages/Home/Home";
import AboutPage from "./Pages/About/About";
import BrandPage from "./Pages/Brand/Brand";
import CommunityPage from "./Pages/Community/Community";
import CoffeePage from "./Pages/Coffee/Coffee";
import PrivateRoute from "./Util/PrivateRoute";
import ErrorPage from "./Pages/ErrorPage";
import ArticleDetails from "./Component/CommunityComponent/ArticleList/ArticleDetail";
import ArticleListPage from "./Pages/ArticleListPage/ArticleListPage";
import ServicePage from "./Pages/Service/Service";

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
      // {
      //   path: "/about-us",
      //   element: <AboutPage />,
      // },
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
        path: "/service",
        element: <ServicePage />,
      },
    ],
  },
]);

export default router;
