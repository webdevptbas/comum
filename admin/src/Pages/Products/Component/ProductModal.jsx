import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Switch,
  Select,
  Upload,
  message,
  Button,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import {
  fetchBrands,
  fetchBrandTypesByBrand,
  fetchCategories,
  fetchSubCategoriesByCategory,
} from "../../../Util/apiService";

const ProductModal = ({
  open,
  loading,
  editingProduct,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandTypes, setBrandTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const brandOptions = brands
    ?.slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((brand) => ({
      label: brand.name,
      value: brand._id,
    }));

  const brandTypeOptions = brandTypes
    ?.slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((bt) => ({
      label: bt.name,
      value: bt._id,
    }));

  const categoryOptions = categories
    ?.slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((cat) => ({
      label: cat.name,
      value: cat._id,
    }));

  const subCategoryOptions = subCategories
    ?.slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((sub) => ({
      label: sub.name,
      value: sub._id,
    }));

  const loadBrands = async () => {
    try {
      const res = await fetchBrands();
      setBrands(res);
    } catch (err) {
      message.error("Failed to load Brands");
    }
  };

  const loadBrandTypesByBrand = async (brandId) => {
    try {
      const res = await fetchBrandTypesByBrand(brandId);
      setBrandTypes(res);
    } catch (err) {
      message.error("Failed to load Brand types");
    }
  };

  const loadCategories = async () => {
    try {
      const res = await fetchCategories();
      setCategories(res);
    } catch (err) {
      message.error("Failed to load Brands");
    }
  };

  const loadSubCategoriesByCategory = async (categoryId) => {
    try {
      const res = await fetchSubCategoriesByCategory(categoryId);
      setSubCategories(res);
    } catch (err) {
      message.error("Failed to load SubCategories");
    }
  };

  useEffect(() => {
    loadBrands();
    loadCategories();

    if (open) {
      if (editingProduct) {
        const brandId = editingProduct.brand?._id || editingProduct.brand;

        form.setFieldsValue({
          ...editingProduct,
          brand: brandId,
          brandType: editingProduct.brandType?._id || editingProduct.brandType,
          category: editingProduct.category,
          subCategory: editingProduct.subCategory,
        });

        if (brandId) {
          loadBrandTypesByBrand(brandId);
        }

        if (editingProduct.imageUrl?.length) {
          const formattedImages = editingProduct.imageUrl.map((url, index) => ({
            uid: `existing-${index}`,
            name: url.split("/").pop(),
            status: "done",
            url,
          }));

          setFileList(formattedImages);
        }

        const categoryObj = categories.find(
          (c) => c.name === editingProduct.category,
        );

        if (categoryObj) {
          form.setFieldsValue({
            category: categoryObj._id,
          });

          loadSubCategoriesByCategory(categoryObj._id);
        }
      } else {
        form.resetFields();
        setFileList([]);
        setBrandTypes([]);
        setSubCategories([]);
      }
    }
  }, [editingProduct, form, open]);

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) message.error("Only image files allowed");
    return isImage || Upload.LIST_IGNORE;
  };

  const handleImageChange = ({ fileList: newList }) => {
    if (newList.length <= 5) setFileList(newList);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      for (const key in values) {
        if (key === "variations") continue; // skip variations

        let value = values[key];

        if (
          [
            "itemCode",
            "brand",
            "category",
            "brandType",
            "specification",
            "color",
            "size",
            "productCode",
          ].includes(key) &&
          typeof value === "string"
        ) {
          value = value.toUpperCase();
        }

        if (Array.isArray(value)) {
          value.forEach((v) => formData.append(key, v));
        } else if (typeof value === "boolean") {
          formData.append(key, value ? "true" : "false");
        } else if (!value) {
          formData.append(key, key === "discount" ? "0" : "");
        } else {
          formData.append(key, value);
        }
      }

      if (values.variations) {
        formData.append("variations", JSON.stringify(values.variations));
      }

      // Image handling
      // Existing image URLs from DB
      const originalImages = editingProduct?.imageUrl || [];

      // Images still visible in Upload
      const remainingImages = fileList
        .filter((file) => file.url) // existing images only
        .map((file) => file.url);

      // Images user removed
      const deletedImages = originalImages.filter(
        (url) => !remainingImages.includes(url),
      );

      // Send deleted images info
      if (deletedImages.length > 0) {
        formData.append("deletedImages", JSON.stringify(deletedImages));
      }

      // Upload new images
      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("images", file.originFileObj);
        }
      });

      onSubmit(formData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      open={open}
      width={1800}
      bodyStyle={{
        height: "80vh",
        padding: 0,
        overflow: "hidden",
      }}
      style={{ top: 20 }}
      title={editingProduct ? "Edit Product" : "Add Product"}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loading}
    >
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            isDiscount: false,
            discount: 0,
            saleHighlight: false,
            gender: [],
          }}
          onValuesChange={(changed) => {
            if ("isDiscount" in changed && !changed.isDiscount) {
              form.setFieldsValue({ discount: 0 });
            }
          }}
          style={{ flex: 1, overflow: "hidden", padding: 24 }}
        >
          <div style={{ display: "flex", gap: 24, height: "100%" }}>
            {/* LEFT SIDE */}
            <div style={{ flex: 1, overflowY: "auto", paddingRight: 8 }}>
              <h3>Informasi Umum Produk</h3>
              <Form.Item label="Gambar Produk (Maks 5 foto)">
                <Upload
                  multiple
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleImageChange}
                  beforeUpload={beforeUpload}
                  customRequest={({ onSuccess }) =>
                    setTimeout(() => onSuccess("ok"), 0)
                  }
                >
                  {fileList.length >= 5 ? null : (
                    <>
                      <PlusOutlined />
                      <div>Upload</div>
                    </>
                  )}
                </Upload>
              </Form.Item>

              <Form.Item name="productName" label="Nama Produk">
                <Input disabled />
              </Form.Item>

              <Form.Item
                name="brand"
                label="Brand"
                rules={[{ required: true }]}
              >
                <Select
                  options={brandOptions}
                  onChange={(brandId) => {
                    form.setFieldsValue({ brandType: undefined }); // reset child
                    loadBrandTypesByBrand(brandId); // load new options
                  }}
                />
              </Form.Item>

              <Form.Item
                name="brandType"
                label="Brand Type / Tipe Barang"
                rules={[{ required: true }]}
              >
                <Select
                  options={brandTypeOptions}
                  disabled={!form.getFieldValue("brand")}
                />
              </Form.Item>

              <Form.Item
                name="category"
                label="Kategori"
                rules={[{ required: true }]}
              >
                <Select
                  options={categoryOptions}
                  onChange={(categoryId) => {
                    form.setFieldsValue({ subCategory: undefined });
                    loadSubCategoriesByCategory(categoryId);
                  }}
                />
              </Form.Item>

              <Form.Item
                name="subCategory"
                label="Sub Kategori"
                rules={[{ required: true }]}
              >
                <Select
                  options={subCategoryOptions}
                  disabled={!form.getFieldValue("category")}
                />
              </Form.Item>

              <Form.Item name="color" label="Warna">
                <Input />
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

              <Form.Item
                name="saleHighlight"
                label="Sorotan Penjualan?"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item name="details" label="Detail/Deskripsi Produk">
                <Input.TextArea rows={8} />
              </Form.Item>

              <Form.Item name="specification" label="Specification">
                <Input.TextArea rows={8} />
              </Form.Item>
            </div>

            {/* RIGHT SIDE */}
            <div style={{ flex: 1, overflowY: "auto", paddingRight: 8 }}>
              <h3>Varian</h3>
              <Form.List
                name="variations"
                rules={[
                  {
                    required: true,
                    message: "Minimal 1 varian",
                  },
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div
                        key={key}
                        style={{
                          border: "1px solid #344ead",
                          padding: 12,
                          marginBottom: 36,
                        }}
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "itemCode"]}
                          label="SKU"
                          rules={[{ required: true }]}
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "productCode"]}
                          label="Kode Produk"
                          rules={[{ required: false }]}
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "size"]}
                          label="Ukuran"
                          rules={[{ required: true }]}
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "weight"]}
                          label="Weight"
                          rules={[{ required: true }]}
                        >
                          <InputNumber min={1000} style={{ width: "100%" }} />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "stock"]}
                          label="Stok"
                          rules={[{ required: true }]}
                        >
                          <InputNumber min={0} style={{ width: "100%" }} />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "price"]}
                          label="Harga (Rp. )"
                          rules={[{ required: true }]}
                        >
                          <InputNumber
                            min={0}
                            style={{ width: "100%" }}
                            formatter={(value) =>
                              value
                                ? `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ".",
                                  )
                                : ""
                            }
                            parser={(value) => value.replace(/Rp\s?|\./g, "")}
                          />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "isDiscount"]}
                          label="Discount Aktif?"
                          valuePropName="checked"
                        >
                          <Switch />
                        </Form.Item>

                        <Form.Item
                          shouldUpdate={(prev, curr) =>
                            prev.variations?.[name]?.isDiscount !==
                            curr.variations?.[name]?.isDiscount
                          }
                        >
                          {({ getFieldValue }) => {
                            const isDiscount = getFieldValue([
                              "variations",
                              name,
                              "isDiscount",
                            ]);

                            return (
                              <Form.Item
                                {...restField}
                                name={[name, "discount"]}
                                label="Discount (%)"
                                rules={[
                                  {
                                    validator(_, value) {
                                      if (!getFieldValue("isDiscount"))
                                        return Promise.resolve();
                                      if (value < 0 || value > 100)
                                        return Promise.reject("Must be 0–100%");
                                      return Promise.resolve();
                                    },
                                  },
                                ]}
                              >
                                <InputNumber
                                  min={0}
                                  max={100}
                                  disabled={!isDiscount}
                                  style={{ width: "100%" }}
                                />
                              </Form.Item>
                            );
                          }}
                        </Form.Item>

                        <MinusCircleOutlined
                          onClick={() => remove(name)}
                          style={{ color: "red", fontSize: 18 }}
                        />
                      </div>
                    ))}

                    <Form.Item>
                      <Button type="primary" onClick={() => add()}>
                        + Tambah Variasi
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ProductModal;
