import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  IconButton,
  CardMedia,
  InputBase,
  Button,
} from "@material-ui/core";
import { AddRounded, RemoveRounded, AddShoppingCart } from "@material-ui/icons";
import styles from "./Product.module.scss";

const Product = ({ id, name, price, category, image, handleAddToCart }) => {
  const [input, setInput] = useState(1);

  const handleInput = (input) => {
    if (!isNaN(input)) setInput(input);
  };

  const handleIncrement = () => {
    setInput(parseInt(input) + 1);
  };

  const handleDecrement = () => {
    if (input > 1) setInput(parseInt(input) - 1);
  };

  return (
    <Grid className={styles.products} item xs={6} md={4} lg={3}>
      <Card className={styles.products_card}>
        <CardActionArea className={styles.products_image}>
          <CardMedia className={styles.media} image={image} title={name} />
        </CardActionArea>
        <CardContent className={styles.products_content}>
          <Box textAlign="center">
            <Typography>{name}</Typography>
            <Typography variant="h5">$ {price}</Typography>
          </Box>
        </CardContent>
        <Box
          className={styles.products_controls}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <IconButton onClick={handleDecrement}>
            <RemoveRounded />
          </IconButton>
          <InputBase
            value={input}
            className={styles.input}
            onChange={(e) => handleInput(e.target.value.trim())}
          />
          <IconButton onClick={handleIncrement}>
            <AddRounded />
          </IconButton>
        </Box>
        <Box
          className={styles.products_button}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            id={`addtocart_${id}`}
            value={id}
            className={styles.products_addtocart}
            variant="contained"
            startIcon={<AddShoppingCart />}
            onClick={() =>
              handleAddToCart(id, name, image, price, category, input)
            }
          >
            ADD TO CART
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default Product;
