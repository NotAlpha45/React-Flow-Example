import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GraphFilterType } from "../../types/graph-saved-filter-types";

const initialFilterState: GraphFilterType[] = [];

const graphFilterSlice = createSlice({
  name: "graphFilters",
  initialState: initialFilterState,
  reducers: {
    addGraphFilter: (
      state: GraphFilterType[],
      action: PayloadAction<GraphFilterType>
    ) => {
      // If a filter is already present, no need to add it again
      const existingIndex = state.findIndex(
        (filter) =>
          filter.entityName === action.payload.entityName &&
          filter.filterType === action.payload.filterType &&
          filter.sharePercentage === action.payload.sharePercentage
      );

      if (existingIndex > -1) {
        return;
      }

      state.push(action.payload);
    },

    removeGraphFilter: (
      state: GraphFilterType[],
      action: PayloadAction<GraphFilterType>
    ) => {
      const index = state.findIndex(
        (filter) =>
          filter.entityName === action.payload.entityName &&
          filter.filterType === action.payload.filterType &&
          filter.sharePercentage === action.payload.sharePercentage
      );
      if (index > -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const GraphFilterSliceActions = graphFilterSlice.actions;
export const GraphFilterSliceReducer = graphFilterSlice.reducer;
