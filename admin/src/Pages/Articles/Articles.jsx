import React, { useEffect, useState } from "react";
import { Button, Input, Table, Space, Image } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./Articles.css";
import CreateArticleModal from "../../Component/Modals/CreateArticleModal";
import { fetchAllArticle } from "../../Util/apiService";

const ArticlesAdminPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
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
      title: "Date",
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
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await fetchAllArticle();
      setArticles(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleCreate = () => {
    setModalOpen(true);
    // open modal to create
  };

  const handleEdit = (article) => {
    console.log("Edit article:", article);
    // open modal to edit
  };

  const handleDelete = (id) => {
    console.log("Delete article with id:", id);
    // confirmation + delete
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
    </div>
  );
};

export default ArticlesAdminPage;
