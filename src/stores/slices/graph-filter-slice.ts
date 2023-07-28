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
      state.push(action.payload);
    },
  },
});

export const GraphFilterSliceActions = graphFilterSlice.actions;
export const GraphFilterSliceReducer = graphFilterSlice.reducer;
