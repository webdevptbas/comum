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
import ProfileLayout from "./Layout/ProfileLayout/ProfileLayout.jsx";
import ProfilePage from "./Pages/Profile/Profile.jsx";
import OrdersPage from "./Pages/Orders/Orders.jsx";
import ChangePasswordPage from "./Pages/ChangePassword/ChangePassword.jsx";
import ShopLayout from "./Layout/ShopLayout/ShopLayout.jsx";
import BrandShopPage from "./Pages/Shop/BrandShop.jsx";
import CheckoutPage from "./Pages/Checkout/Checkout.jsx";
import PrivateRoute from "../src/Util/PrivateRoute.jsx";
import CheckoutLayout from "./Layout/CheckoutLayout/CheckoutLayout.jsx";
import PaymentPage from "./Pages/Payment/Payment.jsx";
import CompletedPage from "./Pages/Completed/Completed.jsx";
import OrderDetailsPage from "./Pages/Orders/OrderDetails/OrderDetails.jsx";

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
        element: <ShopLayout />, // wrapper
        children: [
          {
            index: true,
            element: <ShopPage />, // /profile
          },
          {
            path: ":brand",
            element: <BrandShopPage />,
          },
        ],
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
      {
        path: "",
        element: <PrivateRoute />,
        children: [
          {
            path: "/checkout",
            element: <CheckoutLayout currentStep={0} />,
            children: [{ index: true, element: <CheckoutPage /> }],
          },
          {
            path: "/payment/:id",
            element: <CheckoutLayout currentStep={1} />,
            children: [{ index: true, element: <PaymentPage /> }],
          },
          {
            path: "/complete", //after payment page, payment confirmed by Midtrans
            element: <CheckoutLayout currentStep={2} />,
            children: [{ index: true, element: <CompletedPage /> }],
          },
          {
            path: "/pending", //after payment page, waiting for Midtrans confirmation
            element: <CheckoutLayout currentStep={1} />,
            children: [{ index: true, element: <CompletedPage /> }],
          },
          {
            path: "/error", //after payment page, payment not accepted
            element: <CheckoutLayout currentStep={1} />,
            children: [{ index: true, element: <CompletedPage /> }],
          },
          {
            path: "/profile",
            element: <ProfileLayout />,
            children: [
              {
                index: true,
                element: <ProfilePage />,
              },
              {
                path: "my-orders",
                element: <OrdersPage />,
                children: [
                  {
                    index: true,
                    element: <OrdersPage />,
                  },
                  {
                    path: "orders/:id",
                    element: <OrderDetailsPage />,
                  },
                ],
              },
              {
                path: "change-password",
                element: <ChangePasswordPage />,
              },
            ],
          },
          {
            path: "orders/:id",
            element: <OrderDetailsPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
