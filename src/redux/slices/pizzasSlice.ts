import { RootState } from "./../store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type fetchPizzasArgs = {
  curPage: number;
  category: string;
  sort: string;
  order: string;
  search: string;
};

export const fetchPizzas = createAsyncThunk<any, fetchPizzasArgs>(
  "pizzas/fetchPizzasStatus",
  async params => {
    const { curPage, category, sort, order, search } = params;
    const { data } = await axios.get<any>(
      `https://64355b0983a30bc9ad5e75ef.mockapi.io/pizzas?page=${curPage}&limit=4&${category}&sortBy=${sort}&order=${order}${search}`
    );
    return data;
  }
);

export enum loadStatus {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface pizzaSliceState {
  items: any;
  loadStatus: loadStatus;
}

const initialState: pizzaSliceState = {
  items: [],
  loadStatus: loadStatus.LOADING /* loading | success | error */,
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPizzas.pending, state => {
      state.loadStatus = loadStatus.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loadStatus = loadStatus.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, state => {
      state.items = [];
      state.loadStatus = loadStatus.ERROR;
    });
  },
});

export const selectPizzas = (state: RootState) => state.pizzas;

export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
