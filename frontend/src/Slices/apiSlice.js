import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { clearCredentials } from "./authSlice";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" });

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    sessionStorage.setItem(
      "sessionExpired",
      "Your session has ended, please login again",
    );
    api.dispatch(clearCredentials());
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Product", "Order", "User"],
  endpoints: (builder) => ({}),
});
