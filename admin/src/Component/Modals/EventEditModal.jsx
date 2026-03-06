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
  Select,
} from "antd";
import "../../Pages/Events/Events.css";
import dayjs from "dayjs";
import { UploadOutlined } from "@ant-design/icons";
import { paceValidators } from "../../Util/paceValidators";

const EventEditModal = ({
  open,
  loading,
  onCancel,
  eventDetails,
  onFinish,
}) => {
  const [form] = Form.useForm();
  const eventType = Form.useWatch("type", form);

  React.useEffect(() => {
    if (!eventDetails) return;

    form.setFieldsValue({
      ...eventDetails,
      date: eventDetails.date ? dayjs(eventDetails.date) : null,
      startTime: eventDetails.startTime
        ? dayjs(eventDetails.startTime, "HH:mm")
        : null,

      ...(eventDetails.type === "cycling" && {
        start: eventDetails.cycling?.start,
        finish: eventDetails.cycling?.finish,
        paceMin: eventDetails.cycling?.paceMin,
        paceMax: eventDetails.cycling?.paceMax,
        durationMinutes: eventDetails.cycling?.durationMinutes,
      }),

      ...(eventDetails.type === "padel" && {
        location: eventDetails.padel?.location,
        court: eventDetails.padel?.court,
        level: eventDetails.padel?.level,
        maxPlayers: eventDetails.padel?.maxPlayers,
        matchFormat: eventDetails.padel?.matchFormat,
        partnerType: eventDetails.padel?.partnerType,
        durationMinutes: eventDetails.padel?.durationMinutes,
      }),
    });
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
        <Form.Item
          name="type"
          label="Event Type"
          rules={[{ required: true, message: "Please select event type" }]}
        >
          <Select placeholder="Select event type">
            <Select.Option value="cycling">Cycling</Select.Option>
            <Select.Option value="padel">Padel</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="title"
          label="Event Title"
          rules={[{ required: true }]}
        >
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
          label="Contact Number (Phone)"
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
          name="shortDesc"
          label="Short Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item name="description" label="Full Description">
          <Input.TextArea rows={4} />
        </Form.Item>

        {/* cycling event type */}
        {eventType === "cycling" && (
          <>
            <Form.Item
              name="start"
              label="Start Point"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="finish"
              label="Finish Point"
              rules={[{ required: true }]}
            >
              <Input />
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
              rules={[
                { required: true, message: "Please enter minimum pace" },
                {
                  validator: (_, value) => {
                    if (value === undefined || value === "")
                      return Promise.resolve();
                    if (Number(value) < 0)
                      return Promise.reject(
                        new Error("Pace must not be negative"),
                      );
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="paceMax"
              label="Maximum Pace (km/h)"
              rules={[({ getFieldValue }) => paceValidators(getFieldValue)]}
            >
              <Input type="number" />
            </Form.Item>
          </>
        )}

        {/* padel event type */}
        {eventType === "padel" && (
          <>
            <Form.Item
              name="location"
              label="Padel Location"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="court"
              label="How many court(s)?"
              rules={[{ required: true }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              name="level"
              label="Player Level"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="Beginner">Beginner</Select.Option>
                <Select.Option value="Upper Beginner">
                  Upper Beginner
                </Select.Option>
                <Select.Option value="Intermediate">Intermediate</Select.Option>
                <Select.Option value="Upper Intermediate">
                  Upper Intermediate
                </Select.Option>
                <Select.Option value="Advanced">Advanced</Select.Option>
                <Select.Option value="Upper Advanced">
                  Upper Advanced
                </Select.Option>
                <Select.Option value="Pro">Pro</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="maxPlayers"
              label="Max Players"
              rules={[{ required: true }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              name="matchFormat"
              label="Match Format"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="Mexicano">Mexicano</Select.Option>
                <Select.Option value="Americano">Americano</Select.Option>
                <Select.Option value="Mixicano">Mixicano</Select.Option>
                <Select.Option value="Team Americano">
                  Team Americano
                </Select.Option>
                <Select.Option value="Team Mexicano">
                  Team Mexicano
                </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="partnerType"
              label="Partner Type"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="Fixed Partner">
                  Fixed Partner
                </Select.Option>
                <Select.Option value="Mixed Partner">
                  Mixed Partner
                </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="durationMinutes"
              label="Match Duration (minutes)"
              rules={[{ required: true }]}
            >
              <Input type="number" />
            </Form.Item>
          </>
        )}

        <Form.Item
          name="image"
          label="Upload Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Upload
            name="thumbnail" // ✅ Must match backend multer field
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
