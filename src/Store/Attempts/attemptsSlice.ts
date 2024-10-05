import { createSlice } from "@reduxjs/toolkit";

interface AttemptsState {
  attempts: 0 | 1 | 2;
}

const initialAttemptsState: AttemptsState = {
  attempts: 0,
};

const attemptsSlice = createSlice({
  name: "attempts",
  initialState: initialAttemptsState,
  reducers: {
    incrementAttempts: (state) => {
      if (state.attempts !== 2) {
        state.attempts += 1;
      }
    },
    reset: (state) => {
      state.attempts = 0;
    },
  },
});

export default attemptsSlice.reducer;

export const { incrementAttempts, reset } = attemptsSlice.actions;
