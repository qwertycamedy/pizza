import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzasStatus",
  async params => {
    const { curPage, category, sort, order, search } = params;
    const { data } = await axios.get(
      `https://64355b0983a30bc9ad5e75ef.mockapi.io/pizzas?page=${curPage}&limit=4&${category}&sortBy=${sort}&order=${order}${search}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  loadStatus: "" /* loading | success | error */,
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: state => {
      state.loadStatus = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.loadStatus = "success";
    },
    [fetchPizzas.rejected]: state => {
      state.items = [];
      state.loadStatus = "error";
    },
  },
});

export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
