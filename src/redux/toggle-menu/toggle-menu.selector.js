import { createSelector } from "reselect";


// input selector to get the cartslice from the state
const selectToggleMenu = state => state.toggleMenu;

// output selector to get the hidden prop from the cart slice
export const selectMobileMenuToggle = createSelector(
   [selectToggleMenu],
   (toggleMenu) => toggleMenu.mobileMenuOpen
)