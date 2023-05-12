import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(
          `Increased ${state.cartItems[itemIndex].name} cart quantity`,
          {
            position: "bottom-left",
          }
        );
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} added to cart`, {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const itemId = action.payload.id;
      const updatedCartItems = state.cartItems.filter(
        (item) => item.id !== itemId
      );

      state.cartItems = updatedCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      toast.error(`${action.payload.name} removed from cart`, {
        position: "bottom-left",
      });
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.error(` Decrease ${action.payload.name} cart quantity`, {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const itemId = action.payload.id;
        const updatedCartItems = state.cartItems.filter(
          (item) => item.id !== itemId
        );

        state.cartItems = updatedCartItems;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

        toast.error(`${action.payload.name} removed from cart`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart(state, action) {
      state.cartItems = [];
      toast.success("Cart cleared", {
        position: "bottom-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotals(state) {
      let totalQuantity = 0;
      let totalAmount = 0;

      state.cartItems.forEach((item) => {
        totalQuantity += item.cartQuantity;
        totalAmount += item.price * item.cartQuantity;
      });

      state.cartTotalQuantity = totalQuantity;
      state.cartTotalAmount = totalAmount;
    },
  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer; // Export the cartReducer

export default cartSlice.reducer;
