import api from "./apiHandler";

//----------------------
//-----PRODUCTS API-----
//----------------------
export const fetchAllProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

export const fetchProductByBrand = async (brand) => {
  try {
    const response = await api.get(`/products/brand/${brand}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with brand ${brand}:`, error);
    throw error;
  }
};

// Create Product
export const createProduct = async (formData) => {
  try {
    const response = await api.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// Update Product
export const updateProduct = async (id, formData) => {
  try {
    const response = await api.put(`/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    throw error;
  }
};

// Delete Product
export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
};

export const importProductsFromCsv = async (formData) => {
  try {
    const response = await api.post("/products/import-csv", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error importing CSV:", error);
    throw error;
  }
};

//------------------------
//-----EVENT LIST API-----
//------------------------
export const fetchAllEvent = async (start, end) => {
  try {
    const response = await api.get("/events", {
      params: { start, end },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const fetchEventById = async (id) => {
  try {
    const response = await api.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching event with ID ${id}:`, error);
    throw error;
  }
};

export const createEvent = async (formData) => {
  try {
    const response = await api.post(`/events`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error creating event:`, error);
    throw error;
  }
};

export const updateEvent = async (id, formData) => {
  try {
    const response = await api.put(`/events/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

//---------------------
//-----JOURNAL API-----
//---------------------
export const fetchAllArticle = async () => {
  try {
    const response = await api.get("/past-events");
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

export const fetchArticleById = async (id) => {
  try {
    const response = await api.get(`/past-events/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching articles with ID ${id}:`, error);
    throw error;
  }
};

export const createArticle = async (formData) => {
  try {
    const response = await api.post(`/past-events`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error creating article:`, error);
    throw error;
  }
};

export const updateArticle = async (id, formData) => {
  try {
    const response = await api.put(`/past-events/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export const deleteArticle = async (id) => {
  try {
    const response = await api.delete(`/past-events/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error;
  }
};

//-------------------
//-----BRAND API-----
//-------------------
export const fetchBrands = async () => {
  try {
    const response = await api.get("/brands");
    return response.data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
};

export const createBrand = async (data) => {
  const response = await api.post(`/brands`, data);
  return response.data;
};

export const toggleBrandStatus = async (id, isActive) => {
  const response = await api.patch(`/brands/${id}`, { isActive });
  return response.data;
};

//-------------------------
//-----BRAND TYPES API-----
//-------------------------
export const fetchBrandTypesByBrand = async (id) => {
  try {
    const response = await api.get(`/brand-types/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
};

export const createBrandType = async (data) => {
  const response = await api.post(`/brand-types`, data);
  return response.data;
};

//----------------------
//-----CATEGORY API-----
//----------------------
export const fetchCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
};

export const createCategory = async (data) => {
  const response = await api.post(`/categories`, data);
  return response.data;
};

// export const toggleCategoryStatus = async (id, isActive) => {
//   const response = await api.patch(`/categories/${id}`, { isActive });
//   return response.data;
// };

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

//-------------------------
//-----SUB CATEGORY API-----
//-------------------------
export const fetchSubCategoriesByCategory = async (id) => {
  try {
    const response = await api.get(`/categories/${id}/sub`);
    return response.data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
};

export const createSubCategory = async (data) => {
  const response = await api.post(`/categories/sub`, data);
  return response.data;
};

export const deleteSubCategory = async (id) => {
  try {
    const response = await api.delete(`/categories/sub/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
