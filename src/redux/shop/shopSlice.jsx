import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
   name: 'shop',
   initialState: {
      collections: null
   },
   reducers: {
      shopCollection: (state, action) => {
         state.collections = action.payload;
      }
   }
})


export const {shopCollection} = shopSlice.actions;

export default shopSlice.reducer;