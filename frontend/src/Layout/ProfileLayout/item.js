import { FaUser, FaBox, FaLock } from "react-icons/fa";

const menu = [
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

export { menu };
