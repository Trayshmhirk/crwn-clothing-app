import { createSelector } from "reselect";

// input selector to get the shop slice from the state
const selectShop = state => state.shop;

// output selector to get the collections prop from the shop slice
export const selectShopItems = createSelector(
   [selectShop],
   (shop) => shop.collections
);

// output the collections with the parameter of the url
export const selectCollection = collectionUrlParam => createSelector(
   [selectShopItems],
   collections => collections ? collections[collectionUrlParam] : null
)
   
// output the collections to be rendered in the preview component
export const selectCollectionsForPreview = createSelector(
   [selectShopItems],
   collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)