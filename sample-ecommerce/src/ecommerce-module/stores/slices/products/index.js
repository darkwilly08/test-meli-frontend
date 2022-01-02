import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AXIOS, STATUS as AXIOS_STATUS } from "boot/api";

//#region APIs
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (search, thunkAPI) => {
    try {
      const response = await AXIOS.get(`items?q=${search}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId, thunkAPI) => {
    try {
      const response = await AXIOS.get(`items/${productId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
//#endregion

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    categories: [],
    status: {
      products: AXIOS_STATUS.idle,
      productDetails: AXIOS_STATUS.idle
    },
    error: {
      products: null,
      productDetails: null
    },
    selectedProduct: null
  },
  reducers: {
    selectProduct: (state, action) => {
      const product = state.products.find((p) => p.id === action.payload);
      state.selectedProduct = product;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.products = [];
      state.categories = [];
      state.error.products = null;
      state.status.products = AXIOS_STATUS.loading;
    });
    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      state.products = payload.items;
      state.categories = payload.categories;
      state.status.products = AXIOS_STATUS.loaded;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status.products = AXIOS_STATUS.error;
      state.error.products = action.error.message;
    });
    builder.addCase(fetchProductById.pending, (state) => {
      state.selectedProduct = null;
      state.error.productDetails = null;
      state.status.productDetails = AXIOS_STATUS.loading;
    });
    builder.addCase(fetchProductById.fulfilled, (state, { payload }) => {
      state.selectedProduct = payload.item;
      state.status.productDetails = AXIOS_STATUS.loaded;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.status.productDetails = AXIOS_STATUS.error;
      state.error.productDetails = action.error.message;
    });
  }
});
