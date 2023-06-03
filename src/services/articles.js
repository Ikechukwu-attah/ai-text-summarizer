import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
  }),

  endpoints: (builder) => ({
    summarized: builder.mutation({
      query: (link) => ({
        url: "summarize",
        method: "POST",
        body: link,
      }),
      providesTags: (result, error) =>
        result ? [{ type: "Article", id: result._id }] : [],
    }),

    getAllSummarizedArticle: builder.query({
      query: () => "summarize/articles",
      providesTags: (result, error) =>
        result ? [...result.map(({ id }) => ({ type: "Article", id }))] : [],
    }),

    getSingleSummarizedArticle: builder.query({
      query: (id) => `summarize/article/${id}`,
    }),

    deleteSummarizedArticle: builder.mutation({
      query: (id) => ({
        url: `summarize/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Article" }],
    }),
  }),
});

export const {
  useSummarizedMutation,
  useGetAllSummarizedArticleQuery,
  useLazyGetSingleSummarizedArticleQuery,
  useDeleteSummarizedArticleMutation,
} = articleApi;
