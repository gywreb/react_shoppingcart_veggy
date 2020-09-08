import React from "react";
import { Paper, List, ListItem, Typography, Box } from "@material-ui/core";

import styles from "./Cart.module.scss";
import { useSelector, useDispatch } from "react-redux";
import Item from "./Item/Item";
import {
  deleteItem,
  addItemQuantity,
  removeItemQuantity,
} from "../../store/reducers/cart/cart";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.list);

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  const handleAdd = (id) => {
    dispatch(addItemQuantity(id));
  };

  const handleRemove = (id) => {
    dispatch(removeItemQuantity(id));
  };

  return (
    <Paper className={styles.cart_body} elevation={5}>
      <List className={styles.cart_main}>
        {cart.length ? (
          cart.map(({ id, name, image, price, category, total, quantity }) => (
            <Item
              key={id}
              id={id}
              name={name}
              image={image}
              price={price}
              category={category}
              total={total}
              quantity={quantity}
              handleDelete={handleDelete}
              handleAdd={handleAdd}
              handleRemove={handleRemove}
            />
          ))
        ) : (
          <>
            <ListItem>
              <img
                src="https://res.cloudinary.com/sivadass/image/upload/v1495427934/icons/empty-cart.png"
                alt="no-item"
              />
            </ListItem>
            <ListItem>
              <Box
                width="100%"
                marginTop="20px"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="h4">You cart is empty!</Typography>
              </Box>
            </ListItem>
          </>
        )}
      </List>
    </Paper>
  );
};

export default Cart;
