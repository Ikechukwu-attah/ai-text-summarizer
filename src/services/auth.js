import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
    prepareHeaders: (headers) => {
      // Get the token from the cookie
      const token = Cookies.get("token");
      console.log("token", token);

      // If token exist, set it as an Authorization header
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "user/signin",
        method: "POST",
        body: credentials,
      }),

      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          // Wait for the query to complete
          const { data } = await queryFulfilled;

          // Set the token in the cookie
          Cookies.set("token", data.token);
        } catch (error) {
          console.log("Error during,login:", error);
        }
      },
    }),

    registerUser: builder.mutation({
      query: (userData) => ({
        url: "user/signup",
        method: "POST",
        body: userData,
      }),
    }),

    forgetPassword: builder.mutation({
      query: (userData) => ({
        url: "user/forgot-password",
        method: "POST",
        body: userData,
      }),
    }),

    resetPassword: builder.mutation({
      query: (userData) => ({
        url: "user/reset-password",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = authApi;
