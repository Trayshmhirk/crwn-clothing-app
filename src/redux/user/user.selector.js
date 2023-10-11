import { createSelector } from "reselect";

// input selector to get the user slice from the state
const selectUser = state => state.user;

// output selector to get the current user prop from the user slice
export const selectCurrentUser = createSelector(
   [selectUser],
   (user) => user.currentUser
)