import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./products/products";
import cartReducer from "./cart/cart";

const reducers = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

export default reducers;
