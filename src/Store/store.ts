import { configureStore } from "@reduxjs/toolkit";
import attemptsReducer from "./Attempts/attemptsSlice";
import snapshotReducer from "./Snapshot/snapshotSlice";

export const store = configureStore({
  reducer: {
    attempts: attemptsReducer,
    snapshot: snapshotReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // for root state
export type AppDispatch = typeof store.dispatch; // for dispatchers; particularly useful for API calls(?)
