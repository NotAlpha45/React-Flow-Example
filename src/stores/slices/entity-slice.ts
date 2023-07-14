import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialEntities } from "../../dummy-data/entity-ownership";
import { Entity } from "../../types/entity-types";

const initialStoreEntities: Entity[] = initialEntities ?? [];

const entitySlice = createSlice({
  name: "entities",
  initialState: initialStoreEntities,
  reducers: {
    addEntity: (state: Entity[], action: PayloadAction<Entity>) => {
      state = [...state, action.payload];
    },
  },
});

export const EntitySliceActions = entitySlice.actions;
export const EntitySliceReducer = entitySlice.reducer;
