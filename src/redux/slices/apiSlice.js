import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_API,
    credentials: "include", // ✅ IMPORTANT for cookies
  }),
  tagTypes: ["User", "MyItems","Claim"],
  endpoints: () => ({}),
});