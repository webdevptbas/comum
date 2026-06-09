import { FaUser, FaBox, FaLock, FaHeart, FaSignOutAlt } from "react-icons/fa";

//menu for Desktop Header
const menuItems = [
  {
    key: "/shop",
    label: "Shop",
  },
  {
    key: "/brands",
    label: "Brands",
    // children: [
    //   {
    //     key: "/brand/local",
    //     label: "Local Brands",
    //   },
    //   {
    //     key: "/brand/international",
    //     label: "International Brands",
    //   },
    // ],
  },
  {
    key: "/service",
    label: "Service",
  },
  {
    key: "/community",
    label: "Community",
  },
  // {
  //   key: "/store",
  //   label: "Store",
  // },
  // {
  //   key: "/coffee",
  //   label: "Comum Coffee",
  // },
  // {
  //   key: "/service",
  //   label: "Service",
  // },
];

//menu for profile on header utilities
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
    label: <a href="/profile/my-orders">Orders</a>,
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

//menu for the Profile Layout
const profileMenu = [
  {
    label: "My Profile",
    icon: <FaUser />,
    path: "/profile",
  },
  {
    label: "Orders",
    icon: <FaBox />,
    path: "/profile/my-orders",
  },
  {
    label: "Change Password",
    icon: <FaLock />,
    path: "/profile/change-password",
  },
];

export { menuItems, getDropdownItem, profileMenu };
