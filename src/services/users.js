import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getUserApi = createApi({
  reducerPath: "getUserApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => "user/allUser",
    }),

    singleUser: builder.query({
      query: (id) => `/user/single-user/${id}`,
    }),
  }),
});

export const { useGetAllUserQuery, useSingleUserQuery } = getUserApi;
