import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { statusCode } from "../utils/statusCode";

const initialState = {
  data: [],
  status: statusCode.IDLE
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getProducts.pending, (state, action) => {
      state.status = statusCode.LOADING
    })
    .addCase(getProducts.fulfilled, (state, action) => {
      state.status = statusCode.IDLE;
      state.data = action.payload;
    })
    .addCase(getProducts.rejected, (state, action) => {
      state.status = statusCode.ERROR
    })
  }
});

export const {fetchProducts} = productSlice.actions;
export default productSlice.reducer;

export const getProducts = createAsyncThunk('products/get', async () => {
  const products = await fetch("https://fakestoreapi.com/products");
  const data = await products.json();
  return data;
});