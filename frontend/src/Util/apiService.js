import api from "./apiHandler";

//----------------------
//-----PRODUCTS API-----
//----------------------
// Get all products
export const fetchAllProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Get single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

//------------------------
//-----EVENT LIST API-----
//------------------------
//get all event
export const fetchAllEvent = async () => {
  try {
    const response = await api.get("/events");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

//get event by ID
export const fetchEventById = async (id) => {
  try {
    const response = await api.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

//---------------------
//-----JOURNAL API-----
//---------------------
//get all journal
export const fetchAllArticle = async () => {
  try {
    const response = await api.get("/past-events");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
