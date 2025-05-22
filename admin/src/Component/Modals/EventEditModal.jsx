// src/Component/Modals/EventEditModal.jsx
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
import dayjs from "dayjs";
import { UploadOutlined } from "@ant-design/icons";

const EventEditModal = ({
  open,
  loading,
  onCancel,
  eventDetails,
  onFinish,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (eventDetails) {
      form.setFieldsValue({
        ...eventDetails,
        date: eventDetails.date ? dayjs(eventDetails.date) : null,
        startTime: eventDetails.startTime
          ? dayjs(eventDetails.startTime, "HH:mm")
          : null,
      });
    }
  }, [eventDetails, form]);

  return (
    <Modal
      title="Edit Event"
      open={open}
      onCancel={onCancel}
      okText="Save Changes"
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onFinish(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      confirmLoading={loading}
    >
      <Form layout="vertical" form={form}>
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
          label="Upload Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Upload
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
            defaultFileList={
              eventDetails?.imageUrl
                ? [
                    {
                      uid: "-1",
                      name: "current_image.jpg",
                      status: "done",
                      url: eventDetails.imageUrl,
                    },
                  ]
                : []
            }
          >
            <Button icon={<UploadOutlined />}>Change Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item name="additionalDetail" label="Additional Details">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EventEditModal;
