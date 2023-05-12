import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import productsReducer, { productsFetch } from "./features/productsSlice";
import { productsApi } from "./features/productsApi";
import cartSlice, { cartReducer, getTotals } from "./features/cartSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware);
  },
});

store.dispatch(productsFetch());
store.dispatch(getTotals());


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
