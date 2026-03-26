import { apiSlice } from "./apiSlice";

export const foundItemApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // 🔥 CREATE FOUND ITEM
    createFoundItem: builder.mutation({
      query: (formData) => ({
        url: "/found/create",
        method: "POST",
        body: formData,
      }),
    }),

    // 📦 GET ALL FOUND ITEMS
    getAllFoundItems: builder.query({
      query: () => ({
        url: "/found/getall",
      }),
    }),

    // 👤 GET MY FOUND ITEMS
    getMyFoundItems: builder.query({
      query: () => ({
        url: "/found/get",
      }),
    }),

  }),
});

export const {
  useCreateFoundItemMutation,
  useGetAllFoundItemsQuery,
  useGetMyFoundItemsQuery,
} = foundItemApi;