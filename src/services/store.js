import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { articleApi } from "./articles";
import { authApi } from "./auth";
import userReducer from "../slices/userSlice";
export const store = configureStore({
  reducer: {
    [articleApi.reducerPath]: articleApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(articleApi.middleware)
      .concat(authApi.middleware),
});
