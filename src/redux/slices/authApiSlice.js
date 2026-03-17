import { apiSlice } from "./apiSlice";


export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    signup: builder.mutation({
      query: (data) => ({
        url: "/user/signup",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
    }),

  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
} = authApi;