// function to add new items to the cart or increase the quantity of items already existing in the cartitem state
export const addItemToCart = (cartItems, cartItemToAdd) => {
   // check if the cartitem id from the state is equal to the cartItem id, we want to add, exists
   const existingCartItem = cartItems.find(
      cartItem => cartItem.id === cartItemToAdd.id
   )
   
   // if the cart item we want to add exists in the state cartItem, add 1 to the quantity prop of the item
   if (existingCartItem) {
      return cartItems.map(
         cartItem => cartItem.id ===  cartItemToAdd.id 
         ?
         { ...cartItem, quantity: cartItem.quantity + 1} 
         :
         cartItem
      )
   }

   // return the cartitems we want to add and a quantity to the cart item in the state, if there are no such items in the state
   return [...cartItems, {...cartItemToAdd, quantity: 1}]
}

// remove the cart item, or the quantity of the cartitem if it exists in the cart item state
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
   const existingCartItem = cartItems.find(
      cartItem => cartItem.id === cartItemToRemove.id
   )
   
   // if the cart item has only one quantity, reemove it entirely
   if (existingCartItem.quantity === 1) {
      return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
   }


   // return the cart items removing only one qunatity of the item
   return cartItems.map(
      cartItem => cartItem.id = cartItemToRemove.id 
      ?
      {...cartItem, quantity: cartItem.quantity - 1} 
      :
      cartItem
   )
}