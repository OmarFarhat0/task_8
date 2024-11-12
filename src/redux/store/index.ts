import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../slice/index";

const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export default store;
