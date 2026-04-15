import React from "react";
import { Badge } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { ComumHomeBlue } from "../../../Icons";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const MobileTopBar = ({ onMenuOpen, onCartOpen }) => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <MenuOutlined onClick={onMenuOpen} className="menu-icon" />

      <div onClick={() => navigate("/")} className="logo">
        <ComumHomeBlue height="31" width="auto" />
      </div>

      <div className="utilities">
        {userInfo ? (
          <FaRegUser
            style={{ fontSize: "20px" }}
            onClick={() => navigate("/profile")}
          />
        ) : (
          <FaRegUser
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={() => {
              if (!userInfo) {
                navigate("/login");
              }
            }}
          />
        )}

        {cartItems.length > 0 ? (
          <Badge
            count={cartItems.reduce((a, c) => a + c.quantity, 0)}
            onClick={onCartOpen}
          >
            <MdOutlineShoppingCart style={{ fontSize: "20px" }} />
          </Badge>
        ) : (
          <MdOutlineShoppingCart
            style={{ fontSize: "20px" }}
            onClick={onCartOpen}
          />
        )}
      </div>
    </>
  );
};

export default MobileTopBar;
