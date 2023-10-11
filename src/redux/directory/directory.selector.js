import { createSelector } from "reselect";

// input selector to get the directory slice from the state
const selectDirectory = state => state.directory;

// output selector to get the section prop from the directory slice
export const selectDirectoryItems = createSelector(
   [selectDirectory],
   (directory) => directory.section
)