import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  initialEntities,
  initialOwnerships,
} from "../../dummy-data/entity-ownership";
import { Entity, OwnerShip } from "../../types/entity-types";

// const initialStoreEntities: Entity[] = initialEntities ?? [];
type EntityStoreType = {
  entities: Entity[];
  ownerships: OwnerShip[];
};

const initialEntityState: EntityStoreType = {
  entities: initialEntities ?? [],
  ownerships: initialOwnerships ?? [],
};

const entitySlice = createSlice({
  name: "entities",
  initialState: initialEntityState,
  reducers: {
    addEntity: (state: EntityStoreType, action: PayloadAction<Entity>) => {
      state.entities.push(action.payload);
    },
    addOwnership: (
      state: EntityStoreType,
      action: PayloadAction<OwnerShip>
    ) => {
      state.ownerships.push(action.payload);
    },
  },
});

export const EntitySliceActions = entitySlice.actions;
export const EntitySliceReducer = entitySlice.reducer;
