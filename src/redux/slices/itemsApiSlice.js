import { apiSlice } from "./apiSlice";

export const itemsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // 🔹 Get all items of logged-in user
    getMyItems: builder.query({
      query: () => ({
        url: "/user/my-items",
        method: "GET",
      }),
    }),

  }),
});

export const {
  useGetMyItemsQuery,
} = itemsApi;