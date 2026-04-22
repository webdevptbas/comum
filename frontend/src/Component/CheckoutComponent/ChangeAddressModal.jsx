import { Form, Input, Modal, Select } from "antd";
import "./ChangeAddressModal.css";

const ChangeAddressModal = ({ open, onCancel, form }) => {
  return (
    <>
      <Modal open={open} onCancel={onCancel}>
        <h4 className="heading4 change-address-title">
          Change Shipment Address
        </h4>
        <Form form={form} variant="outlined" layout="vertical">
          <Form.Item
            label="Province"
            name="province"
            rules={[{ required: true, message: "Please select your Province" }]}
          >
            <Select placeholder="eg DKI Jakarta, Jawa Barat, Jawa Timur" />
          </Form.Item>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please select your City" }]}
          >
            <Input placeholder="eg Jakarta, Surabaya" />
          </Form.Item>
          <Form.Item
            label="District"
            name="district"
            rules={[{ required: true, message: "Please type your District" }]}
          >
            <Input placeholder="eg. " />
          </Form.Item>
          <Form.Item label="Sub District" name="Sub District">
            <Input placeholder="eg. " />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please type your address" }]}
          >
            <Input placeholder="eg. Jl. Jend. Sudirman No. 123" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ChangeAddressModal;
