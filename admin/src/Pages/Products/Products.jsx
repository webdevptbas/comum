import React, { useEffect, useState } from "react";
import { message } from "antd";
import {
  createProduct,
  deleteProduct,
  fetchAllProducts,
  fetchBrands,
  fetchProductByBrand,
  importProductsFromCsv,
  updateProduct,
} from "../../Util/apiService";
import ProductToolbar from "./Component/ProductToolbar";
import ProductTable from "./Component/ProductTable";
import ProductModal from "./Component/ProductModal";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadProducts = async (brandId) => {
    try {
      const res = brandId
        ? await fetchProductByBrand(brandId)
        : await fetchAllProducts();
      setProducts(res);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      message.error("Failed to load products");
    }
  };

  const loadBrands = async () => {
    try {
      const res = await fetchBrands();
      setBrands(res);
    } catch (err) {
      message.error("Failed to load brands", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteProduct(id);
      message.success(res.message);
      loadProducts();
    } catch (err) {
      message.error(err.response?.data?.message);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      const res = editingProduct
        ? await updateProduct(editingProduct._id, formData)
        : await createProduct(formData);

      message.success(res.message);
      setModalVisible(false);
      loadProducts();
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
        `${response.message} - ${response.importedCount} products`,
      );
      loadProducts();
    } catch (err) {
      console.error(err);
      message.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
    loadBrands();
  }, []);

  return (
    <>
      <ProductToolbar
        brands={brands}
        onFilter={loadProducts}
        onAdd={() => {
          setEditingProduct(null);
          setModalVisible(true);
        }}
        onCsvUpload={handleCsvUpload}
      />

      <ProductTable
        products={products}
        onEdit={(record) => {
          setEditingProduct(record);
          setModalVisible(true);
        }}
        onDelete={handleDelete}
      />

      <ProductModal
        open={modalVisible}
        loading={loading}
        editingProduct={editingProduct}
        onSubmit={handleSubmit}
        onCancel={() => {
          setModalVisible(false);
          setEditingProduct(null);
        }}
      />
    </>
  );
};

export default Products;
