import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../Util/CartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      shippingAddress: {},
      shippingMethod: "",
      totalWeight: 0,
      itemsPrice: 0,
      shippingPrice: 0,
      totalPrice: 0,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        const updatedQty = Math.min(
          existItem.quantity + item.quantity,
          item.stock,
        );

        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? { ...x, quantity: updatedQty } : x,
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    updateCartQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const item = state.cartItems.find((x) => x._id === id);

      if (item) {
        item.quantity = Math.min(Math.max(quantity, 1), item.stock);
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;

      // reset shipping method
      state.shippingMethod = null;
      state.shippingPrice = 0;
      return updateCart(state);
    },
    saveShippingMethod: (state, action) => {
      state.shippingMethod = action.payload;
      return updateCart(state);
    },
    setShippingPrice: (state, action) => {
      state.shippingPrice = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  saveShippingAddress,
  saveShippingMethod,
  setShippingPrice,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
