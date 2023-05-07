import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { articleApi } from "./articles";
import { authApi } from "./auth";
export const store = configureStore({
  reducer: {
    [articleApi.reducerPath]: articleApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(articleApi.middleware)
      .concat(authApi.middleware),
});
