import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type activeSort = {
  value: "rating" | "title" | "price" | "-rating" | "-title" | "-price";
  body: string;
};

interface filtersSliceState {
  curPage: number;
  categoryId: number;
  activeSort: activeSort;
  sortIsOpen: boolean;
  searchValue: string;
}

const initialState: filtersSliceState = {
  curPage: 1,
  categoryId: 0,
  activeSort: {
    value: "rating",
    body: "популярности",
  },
  sortIsOpen: false,
  searchValue: "",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCurPage(state, action) {
      state.curPage = action.payload;
    },
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setActiveSort(state, action) {
      state.activeSort = action.payload;
    },
    setSortIsOpen(state, action) {
      state.sortIsOpen = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },

    setFilters(state, action) {
      state.activeSort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
      state.curPage = Number(action.payload.curPage);
    },
  },
});

export const selectFilters = (state: RootState) => state.filters;

export const {
  setCurPage,
  setCategoryId,
  setActiveSort,
  setSortIsOpen,
  setSearchValue,
  setFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
