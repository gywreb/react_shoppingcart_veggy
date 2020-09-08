import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { apiCallBegan } from "../../actions/api";

const slice = createSlice({
  name: "products",
  initialState: {
    list: [],
    list_searched: null,
    filter: "",
    loading: false,
    lastFetched: null,
  },
  reducers: {
    productsRequested: (products, action) => {
      products.loading = true;
    },
    productsReceived: (products, action) => {
      products.list = action.payload;
      products.loading = false;
      products.lastFetched = Date.now();
    },
    productsRequestedFailed: (products, action) => {
      products.loading = false;
    },
    productsSearched: (products, action) => {
      const product_name = new RegExp(action.payload, "gi");
      products.list_searched = products.list.filter((product) =>
        product.name.match(product_name)
      );
    },
    productsSearchedReset: (products, action) => {
      products.list_searched = null;
    },
    productsFilterSet: (products, action) => {
      products.filter = action.payload;
    },
  },
});

const {
  productsRequested,
  productsReceived,
  productsRequestedFailed,
  productsSearched,
  productsSearchedReset,
  productsFilterSet,
} = slice.actions;

export default slice.reducer;

export const loadProducts = () => (dispatch, getState) => {
  const { lastFetched } = getState().products;

  const diffInMinutes = moment().diff(moment(lastFetched), "minutes");
  if (diffInMinutes < 10) return;

  dispatch(
    apiCallBegan({
      onStart: productsRequested.type,
      onSuccess: productsReceived.type,
      onError: productsRequestedFailed.type,
    })
  );
};

export const searchProducts = (input) => (dispatch) =>
  dispatch({
    type: productsSearched.type,
    payload: input,
  });

export const resetSearch = () => (dispatch) =>
  dispatch({ type: productsSearchedReset.type });

export const setFilter = (filter) => (dispatch) =>
  dispatch({
    type: productsFilterSet.type,
    payload: filter,
  });
