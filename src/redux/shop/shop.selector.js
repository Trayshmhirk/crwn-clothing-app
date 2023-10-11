import { createSelector } from "reselect";

// input selector to get the shop slice from the state
const selectShop = state => state.shop;

// output selector to get the collections prop from the shop slice
export const selectShopItems = createSelector(
   [selectShop],
   (shop) => shop.collections
);

// 
export const selectCollection = collectionUrlParam => createSelector(
   [selectShopItems],
   collections => collections[collectionUrlParam]  
)
   
//
export const selectCollectionsForPreview = createSelector(
   [selectShopItems],
   collections => Object.keys(collections).map(key => collections[key])
)