import { createSelector } from "reselect";

// input selector to get the toggle menu from the state
const selectToggleMenu = state => state.toggleMenu;

// output selector to get the mobilemenuopen prop from the togglemenu slice
export const selectMobileMenuToggle = createSelector(
   [selectToggleMenu],
   (toggleMenu) => toggleMenu.mobileMenuOpen
)