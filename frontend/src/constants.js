export const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://192.168.18.5:5000" : "";
export const PRODUCTS_URL = "/api/products";
export const USERS_URL = "/api/users";
export const ORDERS_URL = "/api/orders";
export const PAYMENT_GATEWAY_URL = "/api/config/payment-gateway";
