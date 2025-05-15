import React from "react";
import { Layout, Menu, message } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "./Util/AuthContext";
import api from "./Util/apiHandler";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isProductAdmin = user?.role === "AdminProduct";
  const isEventAdmin = user?.role === "AdminEvent";

  const handleLogout = async () => {
    try {
      // Optional: call backend logout route if you have one
      await api.post("/auth/logout"); // only if backend supports token invalidation

      logout(); // clear from context + localStorage
      message.success("You have been logged out.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      message.error("Logout failed");
    }
  };

  const menuItems = [
    {
      key: "/dashboard",
      label: "Dashboard",
    },
    ...(isProductAdmin
      ? [
          {
            key: "/products",
            label: "Manage Products",
          },
        ]
      : isEventAdmin
      ? [
          {
            key: "/events",
            label: "Manage Events",
          },
          {
            key: "/articles",
            label: "Manage Articles",
          },
        ]
      : []),
    {
      key: "logout",
      label: "Logout",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200}>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          style={{ height: "100%" }}
          items={menuItems}
          onClick={({ key }) => {
            if (key === "logout") {
              handleLogout();
            } else {
              navigate(key);
            }
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content
          style={{ margin: "24px", background: "#fff", padding: "24px" }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
