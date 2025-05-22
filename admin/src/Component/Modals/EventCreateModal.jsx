// components/EventModals/CreateEventModal.jsx
import React from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Upload,
  Button,
} from "antd";
import "../../Pages/Events/Events.css";
import { UploadOutlined } from "@ant-design/icons";

const CreateEventModal = ({ open, onCancel, onCreate, form }) => {
  return (
    <Modal
      title="Create New Event"
      open={open}
      onCancel={onCancel}
      onOk={form.submit}
      okText="Create"
    >
      <Form form={form} layout="vertical" onFinish={onCreate}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="contactPerson"
          label="Contact Person"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="contactInfo"
          label="Contact Info (Phone)"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="location"
          label="Start Point"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Finish Point"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="date" label="Date" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="startTime"
          label="Start Time"
          rules={[{ required: true }]}
        >
          <TimePicker format="HH:mm" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="durationMinutes"
          label="Duration (minutes)"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="paceMin"
          label="Minimum Pace (km/h)"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="paceMax"
          label="Maximum Pace (km/h)"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                const paceMin = getFieldValue("paceMin");
                if (!value || Number(value) >= Number(paceMin)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "Maximum pace must be greater than or equal to minimum pace"
                  )
                );
              },
            }),
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="shortDesc"
          label="Short Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item name="description" label="Full Description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="image"
          label="Upload Image (less than 2Mb)"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Upload listType="picture" maxCount={1} beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item name="additionalDetail" label="Additional Details">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateEventModal;
