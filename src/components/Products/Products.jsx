import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../../store/reducers/products/products";
import Loader from "react-loader-spinner";
import { Grid, Box, Typography } from "@material-ui/core";
import Product from "./Product/Product";
import { addToCart } from "../../store/reducers/cart/cart";
import { useSnackbar } from "notistack";

const Products = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.products.loading);
  const products = useSelector((state) => state.products.list);
  const searched_products = useSelector(
    (state) => state.products.list_searched
  );
  const filter = useSelector((state) => state.products.filter);
  const [list, setList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (filter.length)
      return searched_products
        ? setList(
            searched_products.filter((product) =>
              product.category.includes(filter)
            )
          )
        : setList(
            products.filter((product) => product.category.includes(filter))
          );
    searched_products ? setList(searched_products) : setList(products);
  }, [searched_products, products, filter]);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const handleAddToCart = (id, name, image, price, category, quantity) => {
    if (parseInt(quantity) < 1 || quantity === "")
      return enqueueSnackbar("You have to buy at least 1", {
        variant: "error",
      });
    dispatch(
      addToCart({ product: { id, name, image, category, price }, quantity })
    );
  };

  if (loading)
    return (
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000}
      />
    );

  return (
    <>
      <Grid container spacing={4}>
        {list.length ? (
          list.map(({ id, name, price, image, category }) => (
            <Product
              key={id}
              id={id}
              name={name}
              price={price}
              image={image}
              category={category}
              handleAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <>
            <Box
              width="100%"
              marginTop="20px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <img
                style={{ maxWidth: "418px" }}
                src="https://res.cloudinary.com/sivadass/image/upload/v1494699523/icons/bare-tree.png"
                alt="no-products"
              />
            </Box>
            <Box
              width="100%"
              marginTop="30px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h4">
                Sorry, no products matched your search!
              </Typography>
            </Box>
            <Box
              width="100%"
              marginTop="20px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="subtitle1">
                Enter a different keyword and try.
              </Typography>
            </Box>
          </>
        )}
      </Grid>
    </>
  );
};

export default Products;
