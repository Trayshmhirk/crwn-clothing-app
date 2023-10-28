import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { collection, onSnapshot } from "firebase/firestore";
import { convertCollectionsSnapshotToMap, firestore } from "../../firebase/firebase.utils";

// create the async thunk using redux toolkit
export const fetchCollections = createAsyncThunk('shop/fetchCollections', async () => {
   const collectionRef = collection(firestore, 'collections');
   
   return new Promise((resolve, reject) => {
      onSnapshot(collectionRef, async (snapshot) => {
         try {
            const collectionFromFirestore = convertCollectionsSnapshotToMap(snapshot);
            setTimeout(() => {
               resolve(collectionFromFirestore);
            }, 1000);
            // console.log("fetched collections:  ", collectionFromFirestore);
            
         } catch (error) {
            // console.log('error fetching collections:  ', error);
            reject(error);
         }
      })
   })
})


export const shopSlice = createSlice({
   name: 'shop',
   initialState: {
      collections: null,
      isFetching: false,
      error: null
   },
   reducers: {
      shopCollection: (state, action) => {
         state.collections = action.payload;
      }
   },
   extraReducers: (builder) => {
      builder
      .addCase(fetchCollections.pending, (state) => {
         // console.log('collections is fetching...');
         state.isFetching = true
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
         // console.log('collections fetched:  ', action.payload);
         state.isFetching = false;
         state.collections = action.payload;
      })
      .addCase(fetchCollections.rejected, (state, action) => {
         // console.log('error fetching collections:  ', action.error.message);
         state.isFetching = false;
         state.error = action.error.message;
      })
   }
})


export const {shopCollection} = shopSlice.actions;

export default shopSlice.reducer;