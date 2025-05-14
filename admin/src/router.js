import { createBrowserRouter } from "react-routers";

const router = createBrowserRouter([
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
