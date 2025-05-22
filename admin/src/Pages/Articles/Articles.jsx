import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Table,
  Space,
  Image,
  Form,
  Popconfirm,
  message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./Articles.css";
import CreateArticleModal from "../../Component/Modals/CreateArticleModal";
import { deleteArticle, fetchAllArticle } from "../../Util/apiService";
import EditArticleModal from "../../Component/Modals/EditArticleModal";

const ArticlesAdminPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (url) => <Image width={80} src={url} />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        const date = new Date(createdAt);
        const formatted = date.toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Jakarta", // optional for correct local time
        });
        return <div>{formatted.replace(",", " at")}</div>;
      },
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record._id)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this article?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchArticles = async () => {
    try {
      const data = await fetchAllArticle();
      const sortedData = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setArticles(sortedData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleCreate = () => {
    setModalOpen(true);
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteArticle(id); // assuming you have this in your apiService.js
      message.success("Article deleted successfully!");
      fetchArticles(); // refresh your table data
    } catch (error) {
      console.error("Failed to delete article:", error);
      message.error("Failed to delete article.");
    }
  };

  return (
    <div className="articles-admin-container">
      <div className="articles-header">
        <h1>Articles</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Add Article
        </Button>
        <CreateArticleModal
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          form={createForm}
        />
      </div>

      <Input.Search
        placeholder="Search articles"
        style={{ marginBottom: "1rem", maxWidth: 400 }}
        allowClear
        onSearch={(value) => console.log("Search:", value)}
      />

      <Table
        dataSource={articles}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <EditArticleModal
        open={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        article={selectedArticle}
        form={editForm}
      />
    </div>
  );
};

export default ArticlesAdminPage;
