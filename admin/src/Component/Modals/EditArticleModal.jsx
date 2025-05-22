import { Modal, Form, Input, Upload, Button, Space, Tag, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { updateArticle } from "../../Util/apiService";

const EditArticleModal = ({ open, onCancel, form, article }) => {
  const [sections, setSections] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (article) {
      form.setFieldsValue({
        title: article.title,
        shortDesc: article.shortDesc,
        thumbnail: [], // empty so user uploads if they want to change
      });
      setSections(article.articleSections || []);
      setTags(article.tags || []);
    }
  }, [article, form]);

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
      formData.append("articleSections", JSON.stringify(sections));
      formData.append("tags", JSON.stringify(tags));

      if (values.thumbnail?.[0]?.originFileObj) {
        formData.append("thumbnail", values.thumbnail[0].originFileObj);
      }

      await updateArticle(article._id, formData);
      message.success("Article updated successfully");
      onCancel();
      form.resetFields();
    } catch (err) {
      console.error("Edit error:", err);
      message.error("Failed to update article");
    }
  };

  return (
    <Modal
      title="Edit Article"
      open={open}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => handleSubmit(values))
          .catch((err) => console.log("Form validation failed:", err));
      }}
      okText="Update"
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
          label="Upload New Image (optional)"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
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

export default EditArticleModal;
