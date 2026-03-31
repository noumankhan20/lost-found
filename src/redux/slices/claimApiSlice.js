import { apiSlice } from "./apiSlice";

export const claimApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ Create claim
    createClaim: builder.mutation({
      query: (data) => ({
        url: "/claim/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Claim"],
    }),

    // ✅ Get claims for owner
    getMyClaims: builder.query({
      query: () => ({
        url: "/claim/my-claims",
      }),
      providesTags: ["Claim"],
    }),

    // ✅ Approve claim
    approveClaim: builder.mutation({
      query: (id) => ({
        url: `/claim/${id}/approve`,
        method: "PUT",
      }),
      invalidatesTags: ["Claim"],
    }),

    // ✅ Reject claim
    rejectClaim: builder.mutation({
      query: (id) => ({
        url: `/claim/${id}/reject`,
        method: "PUT",
      }),
      invalidatesTags: ["Claim"],
    }),

    getClaimsMade: builder.query({
      query: () => ({
        url: "/claim/claimed",
      }),
      providesTags: ["Claim"],
    }),

  }),
});

export const {
  useCreateClaimMutation,
  useGetMyClaimsQuery,
  useApproveClaimMutation,
  useRejectClaimMutation,
  useGetClaimsMadeQuery,
} = claimApi;