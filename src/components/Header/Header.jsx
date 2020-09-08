import React, { useState, useEffect } from "react";
import {
  AppBar,
  Container,
  InputBase,
  Button,
  IconButton,
  Badge,
  Box,
  Grid,
  ClickAwayListener,
  Typography,
} from "@material-ui/core";
import { Search, ShoppingCart } from "@material-ui/icons";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  searchProducts,
  resetSearch,
} from "../../store/reducers/products/products";
import Cart from "../Cart/Cart";

const Header = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) =>
    state.cart.list.reduce((acc, currItem) => (acc += currItem.quantity), 0)
  );
  const total = useSelector((state) =>
    state.cart.list.reduce(
      (acc, currItem) => (acc += currItem.price * currItem.quantity),
      0
    )
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (items) setOpen(true);
  }, [items]);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (e) => {
    if (!e.target.value.trim()) return dispatch(resetSearch());
    dispatch(searchProducts(e.target.value.trim()));
  };

  return (
    <>
      <AppBar className={styles.header_body}>
        <Container maxWidth="md">
          <Grid container justify="center" alignItems="center" spacing={4}>
            <Grid item xs={3} lg={2}>
              <img
                src="https://res.cloudinary.com/sivadass/image/upload/v1493547373/dummy-logo/Veggy.png"
                alt="logo"
              />
            </Grid>
            <Grid item xs={6} lg={6}>
              <Box display="flex">
                <InputBase
                  className={styles.search_bar}
                  placeholder="Search for Vegetables and Fruits"
                  onChange={handleSearch}
                />
                <Button className={styles.search_button} variant="outlined">
                  <Search />
                </Button>
              </Box>
            </Grid>
            <ClickAwayListener onClickAway={handleClose}>
              <Grid className={styles.cart} item xs={3} lg={4}>
                <Grid container alignItems="center">
                  <Grid item xs={12} lg={8}>
                    <Typography variant="h6" className={styles.total_price}>
                      Total : ${total}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <IconButton onClick={handleOpen}>
                      <Badge badgeContent={items} max={99} color="error">
                        <ShoppingCart />
                      </Badge>
                    </IconButton>
                  </Grid>
                </Grid>
                {open ? <Cart /> : null}
              </Grid>
            </ClickAwayListener>
          </Grid>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
