import { FaUser, FaBox, FaLock, FaHeart, FaSignOutAlt } from "react-icons/fa";

const getDropdownItem = (userInfo, onLogout) => [
  {
    key: "greeting",
    label: (
      <div
        style={{
          cursor: "default",
          color: "#2B4190",
        }}
      >
        Hello,{" "}
        <span
          style={{
            fontWeight: "bold",
          }}
        >
          {userInfo?.user?.name || "User"}
        </span>
      </div>
    ),
    disabled: true,
  },
  { type: "divider" },
  {
    key: "profile",
    icon: <FaUser />,
    label: <a href="/profile">My Profile</a>,
  },
  {
    key: "orders",
    icon: <FaBox />,
    label: <a href="/profile/orders">Orders</a>,
  },
  {
    key: "wishlist",
    icon: <FaHeart />,
    label: "Wishlist",
  },
  {
    key: "password",
    icon: <FaLock />,
    label: <a href="/profile/change-password">Change Password</a>,
  },
  { type: "divider" },
  {
    key: "logout",
    icon: <FaSignOutAlt />,
    danger: true,
    label: "Logout",
    onClick: onLogout,
  },
];

export default getDropdownItem;
