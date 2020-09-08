import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducers/reducers";
import api from "./middlewares/api";

export default function () {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), api],
  });
}
