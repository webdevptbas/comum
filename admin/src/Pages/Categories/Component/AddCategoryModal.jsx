import React from "react";
import { Form, Input, Modal, Switch } from "antd";

const AddCategoryModal = ({ open, loading, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    const values = await form.validateFields();
    await onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      open={open}
      title="Add Category"
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Nama Category"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="isActive"
          label="Category Aktif?"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch defaultChecked={true} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;
