import React from "react";
import { Form, Input, Modal, Switch } from "antd";

const AddBrandModal = ({ open, loading, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    const values = await form.validateFields();
    await onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      open={open}
      title="Add Brand"
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Nama Brand" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item name="isActive" label="Brand Aktif?">
          <Switch defaultChecked={true} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBrandModal;
