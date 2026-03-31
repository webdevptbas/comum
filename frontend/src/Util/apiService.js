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

// export const fetchProductById = async (id) => {
//   try {
//     const response = await api.get(`/products/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching product with ID ${id}:`, error);
//     throw error;
//   }
// };

//------------------------
//-----EVENT LIST API-----
//------------------------
export const fetchAllEvent = async (start, end) => {
  try {
    const response = await api.get("/events", {
      params: { start, end },
      headers: { "Cache-Control": "no-cache" },
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
    console.error(`Error fetching events with ID ${id}:`, error);
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
    console.error(`Error fetching article with ID ${id}:`, error);
    throw error;
  }
};

//-----------------------
//-----SUBSCRIBE API-----
//-----------------------
export const subscribeEmail = async (email) => {
  try {
    const response = await api.post("/subscribe", { email });
    return response.data;
  } catch (error) {
    console.error("Error subscribing email:", error);
    throw error;
  }
};

//-----------------------
//-----BRANDS API--------
//-----------------------
export const fetchBrands = async () => {
  try {
    const response = await api.get("/brands");
    return response.data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
};

//---------------------------
//-----CATEGORIES API--------
//---------------------------
export const fetchCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
