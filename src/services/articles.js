import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
    // prepareHeaders: (headers) => {
    //   headers.set("X-RapidAPI-Key", rapidApiKey);
    //   headers.set(
    //     "X-RapidAPI-Host",
    //     "article-extractor-and-summarizer.p.rapidapi.com"
    //   );

    //   return headers;
    // },
  }),
  // endpoints: (builder) => ({
  //   getSummary: builder.query({
  //     query: (params) =>
  //       `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
  //   }),
  // }),

  endpoints: (builder) => ({
    summarized: builder.mutation({
      query: (link) => ({
        url: "summarize",
        method: "POST",
        body: link,
      }),
    }),

    getAllSummarizedArticle: builder.query({
      query: () => "summarize/articles",
    }),

    getSingleSummarizedArticle: builder.query({
      query: (id) => `summarize/article/${id}`,
    }),

    deleteSummarizedArticle: builder.mutation({
      query: (id) => ({
        url: `summarize/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSummarizedMutation,
  useGetAllSummarizedArticleQuery,
  useLazyGetSingleSummarizedArticleQuery,
  useDeleteSummarizedArticleMutation,
} = articleApi;
