import { Button, Card, Form, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ChangeAddressModal from "./ChangeAddressModal";
import { saveShippingAddress } from "../../Slices/cartSlice";
import { districtCalculateCost } from "../../Util/apiService";

const AddressSection = ({ setShippingOptions }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, totalWeight } = cart;
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleFinish = async (values) => {
    dispatch(saveShippingAddress(values));

    try {
      const payload = {
        destination: values.district.value,
        weight: totalWeight,
      };

      const res = await districtCalculateCost(payload);

      const options = res?.data || [];

      setShippingOptions(options);
    } catch (err) {
      message.error(err);
    }

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
          {shippingAddress?.address?.toUpperCase()},{" "}
          {shippingAddress?.subdistrict && shippingAddress?.subdistrict?.label},{" "}
          {shippingAddress?.district?.label}, {shippingAddress?.city?.label},{" "}
          {shippingAddress?.province?.label}
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
