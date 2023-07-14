import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { GraphReducer } from "./slices/graph-slice";
import { TypedUseSelectorHook, createSelectorHook } from "react-redux";
import { EntitySliceReducer } from "./slices/entity-slice";

const appReducer = combineReducers({
  graph: GraphReducer,
  entity: EntitySliceReducer,
});

export const appStore = configureStore({
  reducer: appReducer,
});

type AppStoreType = ReturnType<typeof appReducer>;

export const useAppSelector =
  createSelectorHook() as TypedUseSelectorHook<AppStoreType>;
