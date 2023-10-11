import { createSelector } from "reselect";

// input selector to get the cartslice from the state
const selectCart = state => state.cart;

// output selector to get the hidden prop from the cart slice
export const selectHidden = createSelector(
   [selectCart],
   (cart) => cart.hidden
)

// output selector to get the cart items prop from the cart slice
export const selectCartItems = createSelector(
   [selectCart],
   (cart) => cart.cartItems
)

// output selector to calculate the total cart item quantity from the cart selected in the cart items
export const totalQuantity = createSelector(
   [selectCartItems],
   (cartItems) => cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
)

export const selectCartTotal = createSelector(
   [selectCartItems],
   (cartItems) => cartItems.reduce((total, cartItem) => 
      total + cartItem.quantity * cartItem.price,
      0
   )
)
