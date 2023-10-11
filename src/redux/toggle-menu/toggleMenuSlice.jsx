import { createSlice } from "@reduxjs/toolkit";

export const toggleMenuSlice = createSlice({
   name: 'toggle-menu',
   initialState: {
      mobileMenuOpen: false,
   },

   reducers : {
      menuToggle: (state) => {
         state.mobileMenuOpen = !state.mobileMenuOpen;
      },
   }
})


export const {menuToggle} = toggleMenuSlice.actions;

export default toggleMenuSlice.reducer;