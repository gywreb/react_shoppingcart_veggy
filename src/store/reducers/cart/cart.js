import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "cart",
  initialState: {
    list: [],
  },
  reducers: {
    cartAdded: (cart, action) => {
      const { product, quantity } = action.payload;
      const { id, price } = product;
      const item = cart.list.find((item) => item.id === parseInt(id));
      if (item) {
        item.quantity += parseInt(quantity);
        item.total = price * item.quantity;
      } else
        cart.list.unshift({
          ...product,
          id: parseInt(id),
          quantity: parseInt(quantity),
          total: price * quantity,
        });
    },
    cartDeleted: (cart, action) => {
      const index = cart.list.findIndex(
        (item) => item.id === parseInt(action.payload)
      );
      cart.list.splice(index, 1);
    },
    cartItemAdded: (cart, action) => {
      const item = cart.list.find(
        (item) => item.id === parseInt(action.payload)
      );
      if (item.quantity > 98) return;
      item.quantity += 1;
    },
    cartItemRemoved: (cart, action) => {
      const item = cart.list.find(
        (item) => item.id === parseInt(action.payload)
      );
      if (item.quantity < 2) return;
      item.quantity -= 1;
    },
    cartItemQuantitySet: (cart, action) => {
      const { id, quantity } = action.payload;
      const item = cart.list.find((item) => item.id === parseInt(id));
      item.quantity = parseInt(quantity);
    },
  },
});

const {
  cartAdded,
  cartDeleted,
  cartItemAdded,
  cartItemRemoved,
  cartItemQuantitySet,
} = slice.actions;

export default slice.reducer;

export const addToCart = (item) => (dispatch) =>
  dispatch({
    type: cartAdded.type,
    payload: item,
  });

export const deleteItem = (id) => (dispatch) =>
  dispatch({
    type: cartDeleted.type,
    payload: id,
  });

export const addItemQuantity = (id) => (dispatch) =>
  dispatch({
    type: cartItemAdded.type,
    payload: id,
  });

export const removeItemQuantity = (id) => (dispatch) =>
  dispatch({
    type: cartItemRemoved.type,
    payload: id,
  });

export const setQuantity = (value) => (dispatch) =>
  dispatch({
    type: cartItemQuantitySet.type,
    payload: value,
  });
