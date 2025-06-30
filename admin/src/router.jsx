import { createBrowserRouter, Navigate } from "react-router";
import AdminLayout from "./AdminLayout";
import PrivateRoute from "./Util/PrivateRoute";
import AdminLogin from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import EventsAdminPage from "./Pages/Events/Events";
import ArticlesAdminPage from "./Pages/Articles/Articles";
import Products from "./Pages/Products/Products";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <AdminLogin />,
  },
  {
    path: "/",
    element: <PrivateRoute allowedRoles={["AdminProduct", "AdminEvent"]} />, // Only for layout access
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <Dashboard /> },

          // AdminProduct only
          {
            path: "products",
            element: (
              <PrivateRoute allowedRoles={["AdminProduct"]}>
                <Products />
              </PrivateRoute>
            ),
          },

          // AdminEvent only
          {
            path: "events",
            element: (
              <PrivateRoute allowedRoles={["AdminEvent"]}>
                <EventsAdminPage />
              </PrivateRoute>
            ),
          },
          {
            path: "articles",
            element: (
              <PrivateRoute allowedRoles={["AdminEvent"]}>
                <ArticlesAdminPage />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
