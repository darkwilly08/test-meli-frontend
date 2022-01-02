const { configureStore } = require("@reduxjs/toolkit");
const { productsSlice } = require("./slices/products");

const store = configureStore({
  reducer: {
    products: productsSlice.reducer
  }
});

export default store;
