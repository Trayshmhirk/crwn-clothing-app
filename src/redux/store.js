import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./user/userSlice";
import cartReducer from "./cart/cartSlice";
import directoryReducer from "./directory/directorySlice";
import shopReducer from "./shop/shopSlice";
import toggleMenuReducer  from "./toggle-menu/toggleMenuSlice";

import storage from "redux-persist/lib/storage";
import { 
   persistReducer, 
   persistStore,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,

} from "redux-persist";



const persistConfig = {
   key: 'root',
   storage,
   whitelist: ['cart'] 
}

const reducers = combineReducers({
   user: userReducer,
   cart: cartReducer,
   directory: directoryReducer,
   shop: shopReducer,
   toggleMenu: toggleMenuReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers);


const store = configureStore ({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
      serializableCheck: {
         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
   }),
})

export const persistor = persistStore(store)

export default store;