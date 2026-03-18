import { apiSlice } from "./apiSlice";

export const lostItemApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // 🔥 CREATE LOST ITEM
    createLostItem: builder.mutation({
      query: (formData) => ({
        url: "/lost/create",
        method: "POST",
        body: formData,
      }),
    }),

    // 📦 GET ALL LOST ITEMS
    getAllLostItems: builder.query({
      query: () => ({
        url: "/lost/getall",
      }),
    }),

    // 👤 GET MY LOST ITEMS
    getMyLostItems: builder.query({
      query: () => ({
        url: "/lost/get",
      }),
    }),

  }),
});

export const {
  useCreateLostItemMutation,
  useGetAllLostItemsQuery,
  useGetMyLostItemsQuery,
} = lostItemApi;