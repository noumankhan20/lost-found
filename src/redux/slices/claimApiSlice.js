import { apiSlice } from "./apiSlice";

export const claimApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createClaim: builder.mutation({
      query: (data) => ({
        url: "/claim/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Claim"],
    }),

  }),
});

export const { useCreateClaimMutation } = claimApi;