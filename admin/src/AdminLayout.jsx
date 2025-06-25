import React, { useState } from "react";
import "./index.css";
import { Layout, Menu, Modal, message } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "./Util/AuthContext";
import api from "./Util/apiHandler";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const isProductAdmin = user?.role === "AdminProduct";
  const isEventAdmin = user?.role === "AdminEvent";

  const showLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };

  const confirmLogout = async () => {
    try {
      await api.post("/auth/logout");
      logout();
      message.success("You have been logged out.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      message.error("Logout failed");
    } finally {
      setIsLogoutModalVisible(false);
    }
  };

  const cancelLogout = () => {
    setIsLogoutModalVisible(false);
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
      label: (
        <span
          style={{
            color: "white",
            backgroundColor: "#ff4d4f",
            padding: "4px 12px",
            borderRadius: "4px",
          }}
        >
          Logout
        </span>
      ),
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
              showLogoutModal();
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

      <Modal
        title="Confirm Logout"
        open={isLogoutModalVisible}
        onOk={confirmLogout}
        onCancel={cancelLogout}
        okText="Logout"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </Layout>
  );
};

export default AdminLayout;
