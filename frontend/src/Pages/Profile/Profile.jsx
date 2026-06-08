import React from "react";
import { useSelector } from "react-redux";
import "./Profile.css";
import "../../index.css";

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="profile-page">
      <div className="profile-header">
        {/* <img
            src="https://i.pravatar.cc/150"
          alt={userInfo?.user?.name}
          className="profile-avatar"
        /> */}
      </div>

      <div className="profile-section">
        <h3>Personal Information</h3>

        <div className="profile-row">
          <span>Username</span>
          <span className="profile-value text-m-medium">
            {userInfo?.user?.username}
          </span>
        </div>

        <div className="profile-row">
          <span>Name</span>
          <span className="profile-value text-m-medium">
            {userInfo?.user?.name}
          </span>
        </div>
      </div>

      <div className="profile-section">
        <h3>Contact</h3>

        <div className="profile-row">
          <span>Email</span>
          <span className="profile-value text-m-medium">
            {userInfo?.user?.email}
          </span>
        </div>

        <div className="profile-row">
          <span>Phone Number</span>
          <span className="profile-value text-m-medium">
            +62 {userInfo?.user?.phone}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
