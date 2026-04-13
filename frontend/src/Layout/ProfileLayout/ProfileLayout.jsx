import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { useDispatch } from "react-redux";

import "./ProfileLayout.css";
import { clearCredentials } from "../../Slices/authSlice";
import { useLogoutMutation } from "../../Slices/usersApiSlice";
import { FaSignOutAlt } from "react-icons/fa";
import { menu } from "./item";
import { message, Modal } from "antd";

const ProfileLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [pageTitle, setPageTitle] = useState(menu[0].label);
  const [logoutModal, setLogoutModal] = useState(false);

  const [logoutApiCall] = useLogoutMutation();

  const confirmLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(clearCredentials());
      setLogoutModal(false);
      navigate("/login");
    } catch (error) {
      message.error(error?.data?.message);
    }
  };

  const cancelLogout = () => {
    setLogoutModal(false);
  };

  const showLogoutModal = () => {
    setLogoutModal(true);
  };

  return (
    <>
      <div className="profile-container">
        <h2 className="heading2 profile-title">{pageTitle}</h2>
        <div className="profile-page-content">
          {/* Sidebar */}
          <div className="profile-sidebar">
            {menu.map((item) => (
              <div
                key={item.path}
                className={`profile-menu-item ${
                  location.pathname === item.path ? "active" : ""
                }`}
                onClick={() => {
                  navigate(item.path);
                  setPageTitle(item.label);
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}

            <div className="profile-menu-item logout" onClick={showLogoutModal}>
              <FaSignOutAlt />
              <span>Logout</span>
            </div>
          </div>

          {/* Content */}
          <div className="profile-content">
            <Outlet />
          </div>
        </div>
        <Modal
          title="Confirm Logout"
          open={logoutModal}
          onOk={confirmLogout}
          onCancel={cancelLogout}
          okText="Logout"
          okButtonProps={{ danger: true }}
        >
          <p>Are you sure you want to log out?</p>
        </Modal>
      </div>
    </>
  );
};

export default ProfileLayout;
