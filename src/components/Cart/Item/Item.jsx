import React, { useState, useEffect } from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
  Box,
  InputBase,
  Button,
} from "@material-ui/core";
import { Delete, Remove, Add } from "@material-ui/icons";
import styles from "./Item.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setQuantity } from "../../../store/reducers/cart/cart";

const Item = ({
  id,
  name,
  image,
  price,
  category,
  quantity,
  handleDelete,
  handleAdd,
  handleRemove,
}) => {
  const dispatch = useDispatch();
  const addedItem = useSelector((state) =>
    state.cart.list.find((item) => item.id === parseInt(id))
  );

  const [input, setInput] = useState(quantity);

  const handleSet = (id, quantity) => {
    if (isNaN(quantity) || parseInt(quantity) < 1 || parseInt(quantity) > 99)
      return;
    setInput(quantity);
    if (quantity.length) dispatch(setQuantity({ id, quantity }));
  };

  useEffect(() => setInput(addedItem.quantity), [addedItem.quantity]);

  return (
    <ListItem className={styles.cart_item}>
      <ListItemAvatar>
        <Avatar src={image} alt={name} />
      </ListItemAvatar>
      <ListItemText
        className={styles.product_info}
        primary={name}
        secondary={`$${price} - ${category}`}
      />
      <ListItemText>
        <Box display="flex">
          <Button
            className={styles.cart_remove}
            variant="outlined"
            onClick={() => handleRemove(id)}
          >
            <Remove />
          </Button>
          <InputBase
            value={input}
            className={styles.cart_quantity}
            onChange={(e) => handleSet(id, e.target.value.trim(), e)}
          />
          <Button
            className={styles.cart_add}
            variant="outlined"
            onClick={() => handleAdd(id)}
          >
            <Add />
          </Button>
        </Box>
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={() => handleDelete(id)}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Item;
