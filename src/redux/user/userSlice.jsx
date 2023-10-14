import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
   name: 'userAuth',
   initialState: {
      currentUser: null
   },

   reducers: {
      setUser: (state, action) => {
         state.currentUser += action.payload
      },
      removeUser: (state) => {
         state.currentUser = null;
      }
   },
})

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;