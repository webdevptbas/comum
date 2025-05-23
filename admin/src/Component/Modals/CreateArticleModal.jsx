import React, { useState } from "react";
import "../../Pages/Articles/Articles.css";
import { Modal, Form, Input, Button, Space, Tag, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createArticle } from "../../Util/apiService";

const { TextArea } = Input;

const CreateArticleModal = ({ open, onCancel, onCreate, form }) => {
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

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("shortDesc", values.shortDesc);
      formData.append("thumbnail", values.thumbnail[0].originFileObj);
      formData.append("articleSections", JSON.stringify(sections));
      formData.append("tags", JSON.stringify(tags));

      await createArticle(formData); // from apiService.js
      message.success("Event created successfully");
      onCancel();
      form.resetFields();
      setSections([{ heading: "", body: "" }]);
      setTags([]);
      // window.location.reload();
    } catch (err) {
      message.error("Failed to create event");
    }
  };

  return (
    <Modal
      title="Create Article"
      open={open}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            handleSubmit(values);
          })
          .catch((err) => {
            console.log("Form validation failed:", err);
          });
      }}
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
          label="Upload Image (less than 2MB)"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Upload listType="picture" maxCount={1} beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
        </Form.Item>

        <div style={{ marginTop: "1.5rem" }}>
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

        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
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
