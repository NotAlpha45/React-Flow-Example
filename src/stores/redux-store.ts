import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { GraphReducer } from "./slices/graph-slice";
import {
  TypedUseSelectorHook,
  createSelectorHook,
  useDispatch,
} from "react-redux";

const appReducer = combineReducers({
  graph: GraphReducer,
});

export const appStore = configureStore({
  reducer: appReducer,
});

type AppStoreType = ReturnType<typeof appReducer>;

export const useAppSelector =
  createSelectorHook() as TypedUseSelectorHook<AppStoreType>;
