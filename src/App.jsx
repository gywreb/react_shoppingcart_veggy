import React from "react";
import Header from "./components/Header/Header";
import FilterTabs from "./components/FilterTabs/FilterTabs";
import Products from "./components/Products/Products";
import { Container, Box } from "@material-ui/core";
import { SnackbarProvider } from "notistack";

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <Header />
      <Box className="App">
        <FilterTabs />
        <Container maxWidth="md">
          <Box display="flex" justifyContent="center" alignItems="center">
            <Products />
          </Box>
        </Container>
      </Box>
    </SnackbarProvider>
  );
};

export default App;
