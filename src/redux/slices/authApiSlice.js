import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    signup: builder.mutation({
      query: (data) => ({
        url: "/user/signup",
        method: "POST",
        body: data,
      }),
      // Bust the cache after signup so getMe re-fetches fresh
      invalidatesTags: ["User"],
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
      // Bust the cache after login so getMe re-fetches fresh for the new user
      invalidatesTags: ["User"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
      // Bust ALL cached data on logout — user + items
      invalidatesTags: ["User", "MyItems"],
    }),

    getMe: builder.query({
      query: () => ({
        url: "/user/getme",
      }),
      providesTags: ["User"],
    }),

    getMyItems: builder.query({
      query: () => ({
        url: "/user/my-items",
        method: "GET",
      }),
      providesTags: ["MyItems"],
    }),

  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useGetMyItemsQuery,
} = authApi;