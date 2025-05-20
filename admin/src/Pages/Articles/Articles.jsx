import React from "react";
import { Button, Input, Table, Space, Image } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./Articles.css";
import CreateArticleModal from "../../Component/Modals/CreateArticleModal";

const dummyArticles = [
  {
    id: "1",
    title: "Jakarta Sunday Ride Recap",
    date: "2025-05-11",
    author: "Aris",
    thumbnail: "/images/pastevent1.jpg",
  },
  {
    id: "2",
    title: "Fun Ride to Puncak",
    date: "2025-05-05",
    author: "Aris",
    thumbnail: "/images/pastevent2.jpg",
  },
];

const ArticlesAdminPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
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
      dataIndex: "date",
      key: "date",
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
        dataSource={dummyArticles}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ArticlesAdminPage;
