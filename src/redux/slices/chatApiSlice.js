import { apiSlice } from "./apiSlice";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: "http://localhost:5869/chat",
        method: "POST",
        body: {
          message: data.message,
          history: data.history
        }
      }),
    }),
  }),
});

export const { useSendMessageMutation } = chatApiSlice;