import { createSlice } from "@reduxjs/toolkit";
import SHOP_DATA from "../../pages/shop/shop.data";

export const shopSlice = createSlice({
   name: 'shop',
   initialState: {
      collections: SHOP_DATA
   },
   reducers: {
      shopCollection: (state) => {
         state.collections
      }
   }
})

export default shopSlice.reducer;