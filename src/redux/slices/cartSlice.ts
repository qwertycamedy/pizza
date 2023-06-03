import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type cartItem = {
  id: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
  imageUrl: string;
};

interface cartSliceState {
  total: any;
  cartItems: cartItem[];
}

const initialState: cartSliceState = {
  total: 0,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.cartItems.find(
        item => item.id === action.payload.id
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.cartItems.push({ ...action.payload, count: 1 });
      }

      state.total = state.cartItems.reduce(
        (all, cur) => all + cur.price * cur.count,
        0
      );
    },

    decItem(state, action) {
      const findItem = state.cartItems.find(item => item.id === action.payload);

      if (findItem) {
        findItem.count--;
      }

      state.total = state.cartItems.map(cur => state.total - Number(cur.price));
    },

    removeItem(state, action) {
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload
      );

      state.total = 0;
    },

    clearItems(state) {
      state.cartItems = [];

      state.total = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.cartItems.find(item => item.id === id);

export const { addItem, removeItem, clearItems, decItem } = cartSlice.actions;

export default cartSlice.reducer;
