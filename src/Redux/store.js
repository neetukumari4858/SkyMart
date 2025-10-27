import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import productsReducer from "./ProductsSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
});
