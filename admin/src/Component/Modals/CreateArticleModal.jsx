import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Button,
  Space,
  Tag,
} from "antd";

const { TextArea } = Input;

const CreateArticleModal = ({ open, onCancel, onCreate }) => {
  const [form] = Form.useForm();
  const [sections, setSections] = useState([{ heading: "", body: "" }]);
  const [tags, setTags] = useState([]);

  const addSection = () => {
    setSections([...sections, { heading: "", body: "" }]);
  };

  const handleSectionChange = (index, field, value) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
  };

  const handleTagInput = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      setTags([...tags, e.target.value.trim()]);
      e.target.value = "";
    }
  };

  const handleTagClose = (removedTag) => {
    setTags(tags.filter((tag) => tag !== removedTag));
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const payload = {
          ...values,
          date: values.date.toISOString(),
          startTime: values.startTime.format("HH:mm"),
          articleSections: sections,
          tags,
        };
        onCreate(payload);
        form.resetFields();
        setSections([{ heading: "", body: "" }]);
        setTags([]);
      })
      .catch((info) => console.log("Validation Failed:", info));
  };

  return (
    <Modal
      title="Create Article"
      open={open}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText="Create"
      width={800}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="shortDesc"
          label="Short Description"
          rules={[{ required: true }]}
        >
          <TextArea rows={3} />
        </Form.Item>
        <Form.Item
          name="thumbnail"
          label="Thumbnail URL"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
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
        <Form.Item name="author" label="Author" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <div>
          <h4>Article Sections</h4>
          {sections.map((section, index) => (
            <div key={index} style={{ marginBottom: "1rem" }}>
              <Input
                placeholder="Heading"
                value={section.heading}
                onChange={(e) =>
                  handleSectionChange(index, "heading", e.target.value)
                }
                style={{ marginBottom: "0.5rem" }}
              />
              <TextArea
                placeholder="Body"
                value={section.body}
                onChange={(e) =>
                  handleSectionChange(index, "body", e.target.value)
                }
                rows={3}
              />
            </div>
          ))}
          <Button onClick={addSection}>+ Add Section</Button>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <h4>Tags</h4>
          <Space wrap>
            {tags.map((tag, index) => (
              <Tag key={index} closable onClose={() => handleTagClose(tag)}>
                {tag}
              </Tag>
            ))}
          </Space>
          <Input
            placeholder="Press Enter to add tag"
            onKeyDown={handleTagInput}
            style={{ marginTop: "0.5rem" }}
          />
        </div>
      </Form>
    </Modal>
  );
};

export default CreateArticleModal;
