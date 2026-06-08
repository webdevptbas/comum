import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/my-orders/`,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/my-orders/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getPaymentStatus: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/my-orders/${orderId}/payment-status`,
      }),
      keepUnusedDataFor: 5,
    }),
    syncPaymentStatus: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/my-orders/${orderId}/sync-payment`,
        method: "PUT",
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetMyOrderDetailsQuery,
  useSyncPaymentStatusMutation,
} = ordersApiSlice;
