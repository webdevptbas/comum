import {
  UserOutlined,
  ShoppingOutlined,
  HeartOutlined,
  LockOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

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
    icon: <UserOutlined />,
    label: <a href="/profile">My Profile</a>,
  },
  {
    key: "orders",
    icon: <ShoppingOutlined />,
    label: <a href="/profile/orders">Orders</a>,
  },
  // {
  //   key: "wishlist",
  //   icon: <HeartOutlined />,
  //   label: "Wishlist",
  // },
  {
    key: "password",
    icon: <LockOutlined />,
    label: <a href="/profile/change-password">Change Password</a>,
  },
  { type: "divider" },
  {
    key: "logout",
    icon: <LogoutOutlined />,
    danger: true,
    label: "Logout",
    onClick: onLogout,
  },
];

export default getDropdownItem;
