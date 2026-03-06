import { Menu } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  HeartOutlined,
  LockOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const dropdownItem = [
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
          Budi Sudarsono
        </span>
      </div>
    ),
    disabled: true,
  },
  { type: "divider" },
  {
    key: "profile",
    icon: <UserOutlined />,
    label: "My Profile",
  },
  {
    key: "orders",
    icon: <ShoppingOutlined />,
    label: "Orders",
  },
  {
    key: "wishlist",
    icon: <HeartOutlined />,
    label: "Wishlist",
  },
  {
    key: "password",
    icon: <LockOutlined />,
    label: "Change Password",
  },
  { type: "divider" },
  {
    key: "logout",
    icon: <LogoutOutlined />,
    danger: true,
    label: "Logout",
  },
];

export default dropdownItem;
