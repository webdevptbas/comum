import { Navigate, createBrowserRouter } from "react-router";
import MainLayout from "./Layout";
import HomePage from "./Pages/Home/Home";
import AboutPage from "./Pages/About/About";
import BrandPage from "./Pages/Brand/Brand";
import CommunityPage from "./Pages/Community/Community";
import CoffeePage from "./Pages/Coffee/Coffee";
import AdminLayout from "./AdminLayout";
import AdminLogin from "./Pages/Login/Login";
import Dashboard from "./Pages/AdminPage/Dashboard/Dashboard";
import PrivateRoute from "./Util/PrivateRoute";
import ErrorPage from "./Pages/ErrorPage";

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
        path: "/about-us",
        element: <AboutPage />,
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
        path: "/coffee",
        element: <CoffeePage />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <PrivateRoute allowedRoles={["AdminProduct", "AdminEvent"]} />,
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> }, // ✅ Redirect to dashboard
          { path: "dashboard", element: <Dashboard /> },
          { path: "products", element: <Dashboard /> },
        ],
      },
    ],
  },
]);

export default router;
