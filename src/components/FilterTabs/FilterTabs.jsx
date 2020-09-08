import React from "react";
import { Tabs, Tab, Box } from "@material-ui/core";
import styles from "./FilterTabs.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../store/reducers/products/products";

const FilterTabs = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state) =>
    state.products.list.reduce((acc, { category }) => {
      if (!acc.includes(category)) acc.push(category);
      return acc;
    }, [])
  );

  const [value, setValue] = React.useState("");

  const handleChange = (event, newValue) => {
    dispatch(setFilter(newValue));
    setValue(newValue);
  };

  return (
    <Box className={styles.tabs_group}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="all" value={""} />
        {categories.length
          ? categories.map((category, index) => (
              <Tab key={index} label={category} value={category} />
            ))
          : ""}
      </Tabs>
    </Box>
  );
};

export default FilterTabs;
