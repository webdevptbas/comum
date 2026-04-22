import { Button, Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useState } from "react";
import ChangeAddressModal from "./ChangeAddressModal";

const AddressSection = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [open, setOpen] = useState(false);

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [district, setDistrict] = useState(shippingAddress?.district || "");
  const [subDistrict, setSubDistrict] = useState(
    shippingAddress?.subDistrict || "",
  );
  const [zipCode, setZipCode] = useState(shippingAddress?.zip_code || "");

  const handleModalOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Card className="checkout-card">
        <div className="section-header">
          <h5 className="heading5 checkout-address-title">Shipment Address</h5>
          <Button className="change-btn" onClick={() => handleModalOpen()}>
            <EditOutlined />
            <span>Change</span>
          </Button>
        </div>

        <p className="address-text text-l-regular">
          Jl. Panglima Polim IX No.4, RT/RW/RW: 1/7, Jakarta Selatan...
        </p>
      </Card>
      <ChangeAddressModal open={open} onCancel={() => setOpen(false)} />
    </>
  );
};

export default AddressSection;
