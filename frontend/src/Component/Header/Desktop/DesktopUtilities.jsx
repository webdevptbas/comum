import React, { useState } from "react";
import { Dropdown, Badge, message, Modal } from "antd";
import { MdSearch, MdOutlineShoppingCart } from "react-icons/md";
import { FiCoffee } from "react-icons/fi";
import { MdSportsTennis } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../../Slices/usersApiSlice";
import { clearCredentials } from "../../../Slices/authSlice";
import { getDropdownItem } from "../dekstopMenuItems";
import SearchBar from "../SearchBar/SearchBar";

const DesktopUtilities = ({ onCartOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [searchOpen, setSearchOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [logoutApiCall] = useLogoutMutation();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const isCoffeePage = location.pathname.startsWith("/coffee");
  const isSimulatorPage = location.pathname.startsWith("/simulator");

  const handleSearch = (keyword) => {
    navigate(`/shop?keyword=${keyword}`);
    setSearchOpen(false);
  };

  const handleUserClick = () => {
    if (!userInfo) navigate("/login");
  };

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

  const dropdownItem = getDropdownItem(userInfo, showLogoutModal);

  const dropdownContent = (
    <div style={{ backgroundColor: "white" }}>
      <SearchBar onSearch={handleSearch} />
    </div>
  );

  return (
    <div className="utilities-container header-container">
      <div
        className={`coffee ${isCoffeePage ? "active" : ""}`}
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/coffee")}
      >
        {isCoffeePage ? (
          <FiCoffee style={{ color: "#3267e3", fontSize: "20px" }} />
        ) : (
          <FiCoffee />
        )}
        Comum Coffee
      </div>
      <div
        className={`coffee ${isSimulatorPage ? "active" : ""}`}
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/simulator")}
      >
        {isSimulatorPage ? (
          <MdSportsTennis style={{ color: "#3267e3", fontSize: "20px" }} />
        ) : (
          <MdSportsTennis />
        )}
        Comum Simulator
      </div>
      <div className="vertical-divider" />
      <div className="utilities">
        {/* search dropdown */}
        <Dropdown
          open={searchOpen}
          onOpenChange={setSearchOpen}
          dropdownRender={() => dropdownContent}
          trigger={["click"]}
          placement="bottomRight"
          arrow
        >
          <span>
            <MdSearch style={{ fontSize: "20px", cursor: "pointer" }} />
          </span>
        </Dropdown>

        {/* user dropdown */}
        {userInfo ? (
          <Dropdown
            menu={{ items: dropdownItem }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <span>
              <FaRegUser style={{ fontSize: "20px", cursor: "pointer" }} />
            </span>
          </Dropdown>
        ) : (
          <FaRegUser
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={handleUserClick}
          />
        )}

        {/* cart trigger */}
        {cartItems.length > 0 ? (
          <Badge
            count={cartItems.reduce((a, c) => a + c.quantity, 0)}
            onClick={onCartOpen}
            style={{ cursor: "pointer" }}
          >
            <MdOutlineShoppingCart
              style={{ fontSize: "20px", cursor: "pointer" }}
            />
          </Badge>
        ) : (
          <MdOutlineShoppingCart
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={onCartOpen}
          />
        )}
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
  );
};

export default DesktopUtilities;
