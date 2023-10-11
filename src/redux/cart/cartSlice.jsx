import { createSlice } from "@reduxjs/toolkit";
import { addItemToCart, removeItemFromCart } from "./cart.utils";

export const cartSlice = createSlice({
   name: 'shoppingCart',
   initialState: {
      hidden: true,
      cartItems: []
   },
   reducers: {
      cartToggle: (state) => {
         state.hidden = !state.hidden;
      },
      addCartItem: (state, action) => {
         state.cartItems = addItemToCart(state.cartItems, action.payload);
      },
      clearItemFromCart: (state, action) => {
         state.cartItems = state.cartItems.filter(cartItem => 
            cartItem.id !== action.payload.id
         )
      },
      removeCartItem: (state, action) => {
         state.cartItems = removeItemFromCart(state.cartItems, action.payload)
      }
   }
})

export const {cartToggle, addCartItem, clearItemFromCart, removeCartItem} = cartSlice.actions;

export default cartSlice.reducer;