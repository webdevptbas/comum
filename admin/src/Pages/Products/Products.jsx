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
  Switch,
  Select,
  Upload,
} from "antd";
import api from "../../Util/apiHandler";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import {
  createProduct,
  deleteProduct,
  importProductsFromCsv,
  updateProduct,
} from "../../Util/apiService";

const Products = () => {
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
      await deleteProduct(id);
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

      // Construct FormData
      const formData = new FormData();

      for (const key in values) {
        if (key === "variants") {
          formData.append("variants", JSON.stringify(values.variants || []));
        } else if (Array.isArray(values[key])) {
          values[key].forEach((val) => formData.append(key, val));
        } else {
          const safeValue =
            values[key] === undefined || values[key] === null
              ? key === "discount"
                ? 0
                : key === "isDiscount" || key === "saleHighlight"
                ? false
                : ""
              : values[key];
          formData.append(key, safeValue);
        }
      }

      if (editingProduct) {
        await updateProduct(editingProduct._id, formData);
        message.success("Product updated");
      } else {
        await createProduct(formData);
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

  const handleCsvUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append("csv", file);

    try {
      setLoading(true);
      const response = await importProductsFromCsv(formData); // API call
      message.success(
        `Successfully imported ${response.importedCount} products`
      );
      loadProducts();
    } catch (err) {
      console.error(err);
      message.error("Failed to import products");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Kode Barang",
      dataIndex: "itemCode",
      key: "itemCode",
    },
    {
      title: "Nama Barang",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Sub Kategori",
      dataIndex: "subCategory",
      key: "subCategory",
    },
    {
      title: "Brand Type",
      dataIndex: "brandType",
      key: "brandType",
    },
    {
      title: "Spesifikasi",
      dataIndex: "specification",
      key: "specification",
    },
    {
      title: "Warna",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Ukuran",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Kode Produk",
      dataIndex: "productCode",
      key: "productCode",
    },
    {
      title: "Tahun Kedatangan",
      dataIndex: "arrivalYear",
      key: "arrivalYear",
    },
    {
      title: "Symbol Tahun",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Season",
      dataIndex: "seasonYear",
      key: "seasonYear",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (genders) => genders.join(", "),
    },
    {
      title: "Stok",
      dataIndex: "stock",
      key: "stock",
      render: (val) => (val !== null ? { val } : "-"),
    },
    {
      title: "Harga",
      dataIndex: "price",
      key: "price",
      render: (value) => `Rp ${value.toLocaleString()}`,
    },
    {
      title: "Diskon?",
      dataIndex: "isDiscount",
      key: "isDiscount",
      render: (val) => (val ? "Ya" : "Tidak"),
    },
    {
      title: "Diskon (%)",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Harga Diskon",
      dataIndex: "discountPrice",
      key: "discountPrice",
      render: (val) => (val !== undefined ? `Rp ${val.toLocaleString()}` : "-"),
    },
    {
      title: "Sorotan Sale",
      dataIndex: "saleHighlight",
      key: "saleHighlight",
      render: (val) => (val ? "Ya" : "Tidak"),
    },
    {
      title: "Detail",
      dataIndex: "details",
      key: "details",
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
        <Upload
          accept=".csv"
          showUploadList={false}
          customRequest={handleCsvUpload}
        >
          <Button type="default">📥 Import from CSV</Button>
        </Upload>

        <Button type="primary" onClick={handleAdd}>
          + Add Product
        </Button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <Table
          dataSource={products}
          columns={columns}
          rowKey="_id"
          bordered
          scroll={{ x: "max-content" }}
        />
      </div>

      <Modal
        open={modalVisible}
        title={editingProduct ? "Edit Product" : "Add Product"}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        onOk={handleFormSubmit}
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            isDiscount: false,
            discount: 0,
            saleHighlight: false,
            gender: [],
          }}
        >
          <Form.Item
            name="itemCode"
            label="Kode Barang (SKU)"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="category"
            label="Kategori"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="subCategory"
            label="Sub Kategori"
            rules={[{ required: false }]}
          >
            <Select mode="tags" placeholder="Add sub-categories" />
          </Form.Item>

          <Form.Item
            name="brandType"
            label="Brand Type"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="specification"
            label="Spesifikasi"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="color" label="Warna" rules={[{ required: false }]}>
            <Input />
          </Form.Item>

          <Form.Item name="size" label="Ukuran" rules={[{ required: false }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="productCode"
            label="Kode Produk"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="arrivalYear"
            label="Tahun Kedatangan"
            rules={[{ required: false }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="seasonYear"
            label="Season / Lineup"
            rules={[{ required: false }]}
          >
            <Input placeholder="e.g., Spring 2025, Mid-Year, etc." />
          </Form.Item>

          <Form.Item name="gender" label="Gender">
            <Select
              mode="multiple"
              options={[
                { label: "Men", value: "Men" },
                { label: "Women", value: "Women" },
              ]}
            />
          </Form.Item>

          <Form.Item name="stock" label="Stok" rules={[{ required: false }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="price"
            label="Harga (Rp)"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="isDiscount"
            label="Diskon Aktif?"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="discount"
            label="Diskon (%)"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!getFieldValue("isDiscount")) return Promise.resolve();
                  if (value < 0 || value > 100)
                    return Promise.reject("Diskon harus 0–100%");
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Form.Item shouldUpdate noStyle>
              {({ getFieldValue }) => (
                <InputNumber
                  min={0}
                  max={100}
                  disabled={!getFieldValue("isDiscount")}
                  style={{ width: "100%" }}
                />
              )}
            </Form.Item>
          </Form.Item>

          <Form.Item
            name="saleHighlight"
            label="Sorotan Penjualan?"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item name="details" label="Deskripsi Tambahan">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
