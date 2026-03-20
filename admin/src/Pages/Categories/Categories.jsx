import React, { useEffect, useState } from "react";
import { Card, Button, List, message } from "antd";
import {
  fetchCategories,
  createCategory,
  deleteCategory,
  fetchSubCategoriesByCategory,
  createSubCategory,
  deleteSubCategory,
} from "../../Util/apiService";

import AddCategoryModal from "./Component/AddCategoryModal";
import AddSubCategoryModal from "./Component/AddSubCategoryModal";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [subCategoryModalOpen, setSubCategoryModalOpen] = useState(false);

  const loadCategories = async () => {
    const res = await fetchCategories();
    setCategories(res);
  };

  const loadSubCategories = async (categoryId) => {
    const res = await fetchSubCategoriesByCategory(categoryId);
    setSubCategories(res);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreateCategory = async (values) => {
    try {
      await createCategory(values);
      message.success("Category created");
      setCategoryModalOpen(false);
      loadCategories();
    } catch (err) {
      message.error(err.response?.data?.message);
    }
  };

  const handleCreateSubCategory = async (values) => {
    try {
      await createSubCategory({
        ...values,
        category: selectedCategory._id,
      });

      message.success("SubCategory created");
      setSubCategoryModalOpen(false);
      loadSubCategories(selectedCategory._id);
    } catch (err) {
      message.error(err.response?.data?.message);
    }
  };

  return (
    <>
      <div style={{ display: "flex", gap: 24 }}>
        {/* LEFT: CATEGORY */}
        <Card
          title="Categories"
          style={{ flex: 1 }}
          extra={
            <Button onClick={() => setCategoryModalOpen(true)} type="primary">
              + Add Category
            </Button>
          }
        >
          <List
            dataSource={categories}
            renderItem={(cat) => (
              <List.Item
                onClick={() => {
                  setSelectedCategory(cat);
                  loadSubCategories(cat._id);
                }}
                style={{
                  cursor: "pointer",
                  background:
                    selectedCategory?._id === cat._id
                      ? "#f0f5ff"
                      : "transparent",
                }}
              >
                {cat.name}
                <Button
                  danger
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteCategory(cat._id);
                    loadCategories();
                  }}
                >
                  Delete
                </Button>
              </List.Item>
            )}
          />
        </Card>

        {/* RIGHT: SUBCATEGORY */}
        <Card
          title={
            selectedCategory
              ? `SubCategories - ${selectedCategory.name}`
              : "SubCategories"
          }
          style={{ flex: 1 }}
          extra={
            selectedCategory && (
              <Button
                type="primary"
                onClick={() => setSubCategoryModalOpen(true)}
              >
                + Add SubCategory
              </Button>
            )
          }
        >
          {selectedCategory ? (
            <List
              dataSource={subCategories}
              renderItem={(sub) => (
                <List.Item>
                  {sub.name}
                  <Button
                    danger
                    onClick={() => {
                      deleteSubCategory(sub._id);
                      loadSubCategories(selectedCategory._id);
                    }}
                  >
                    Delete
                  </Button>
                </List.Item>
              )}
            />
          ) : (
            <p>Select a category first</p>
          )}
        </Card>
      </div>

      <AddCategoryModal
        open={categoryModalOpen}
        onCancel={() => setCategoryModalOpen(false)}
        onSubmit={handleCreateCategory}
      />

      <AddSubCategoryModal
        open={subCategoryModalOpen}
        onCancel={() => setSubCategoryModalOpen(false)}
        onSubmit={handleCreateSubCategory}
      />
    </>
  );
};

export default Categories;
