import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { userApi } from "../api/userApi";
import { adminAuthApi } from "../api/adminAuth";
import { adminDataApi } from "../api/adminDataApi";
const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]:userApi.reducer,
    [adminAuthApi.reducerPath]:adminAuthApi.reducer,
    [adminDataApi.reducerPath]:adminDataApi.reducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,userApi.middleware,adminAuthApi.middleware,adminDataApi.middleware)
});

export default store;
