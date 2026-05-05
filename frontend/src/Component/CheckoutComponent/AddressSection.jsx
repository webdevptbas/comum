import { Button, Card, Form } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ChangeAddressModal from "./ChangeAddressModal";
import { saveShippingAddress } from "../../Slices/cartSlice";

const AddressSection = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const hasAddress = Boolean(shippingAddress?.district);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleFinish = (values) => {
    dispatch(saveShippingAddress(values));
    setOpen(false);
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
          {hasAddress ? (
            <>
              {shippingAddress?.address &&
                `${shippingAddress?.address?.toUpperCase()}, `}
              {shippingAddress?.subdistrict &&
                `${shippingAddress?.subdistrict?.label}, `}
              {shippingAddress?.district?.label}, {shippingAddress?.city?.label}
              , {shippingAddress?.province?.label}
            </>
          ) : (
            <p>Set your shipment address</p>
          )}
        </p>
      </Card>
      <ChangeAddressModal
        open={open}
        onCancel={() => setOpen(false)}
        form={form}
        onFinish={handleFinish}
        shippingAddress={shippingAddress}
      />
    </>
  );
};

export default AddressSection;
