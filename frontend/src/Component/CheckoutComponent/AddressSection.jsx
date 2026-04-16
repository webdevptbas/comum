import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";

const AddressSection = () => {
  return (
    <Card className="checkout-card">
      <div className="section-header">
        <h5 className="heading5 checkout-address-title">Shipment Address</h5>
        <div className="change-btn">
          <EditOutlined />
          <span>Change</span>
        </div>
      </div>

      <p className="address-text text-l-regular">
        Jl. Panglima Polim IX No.4, RT/RW/RW: 1/7, Jakarta Selatan...
      </p>
    </Card>
  );
};

export default AddressSection;
