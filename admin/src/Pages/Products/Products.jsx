import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Space,
  Popconfirm,
  message,
} from "antd";
import api from "../../Util/apiHandler";

const ProductsAdminPage = () => {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to load products");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAdd = () => {
    setEditingProduct(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingProduct(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      message.success("Product deleted");
      loadProducts();
    } catch (err) {
      message.error("Failed to delete product");
    }
  };

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, values);
        message.success("Product updated");
      } else {
        await api.post("/products", values);
        message.success("Product added");
      }

      setModalVisible(false);
      loadProducts();
    } catch (err) {
      console.error(err);
      message.error("Error saving product");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value) => `Rp ${value.toLocaleString()}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete this product?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h2 className="heading3">Manage Products</h2>
        <Button type="primary" onClick={handleAdd}>
          + Add Product
        </Button>
      </div>

      <Table dataSource={products} columns={columns} rowKey="_id" bordered />

      <Modal
        open={modalVisible}
        title={editingProduct ? "Edit Product" : "Add Product"}
        onCancel={() => setModalVisible(false)}
        onOk={handleFormSubmit}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="productName"
            label="Product Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price (Rp)"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductsAdminPage;
