import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PlayerDataInterface {
  _id: string;
  PLAYER_NAME: string;
  PLAYER_ID: string;
  FROM_YEAR: number;
  PPG: number;
  GP: number;
  EXP: number;
  TO_YEAR: number;
  __v: number;
}

interface SolutionMapInterface {
  [key: string]: number;
}


interface SnapshotState {
  players: PlayerDataInterface[];
  guesses: PlayerDataInterface[];
  solution_map: SolutionMapInterface;
  scores: number[];
}

const initialSnapshotState: SnapshotState = {
  players: [],
  guesses: [],
  solution_map: {},
  scores: [],
};

interface InitializeGamePayload {
  players: PlayerDataInterface[];
  solution_map: SolutionMapInterface;
}

const snapshotSlice = createSlice({
  name: "snapshot",
  initialState: initialSnapshotState,
  reducers: {

    initializeGame: (state, action: PayloadAction<InitializeGamePayload>) => {
      const { players, solution_map } = action.payload;
      state.players = players;
      state.solution_map = solution_map;
      console.log(state.players);
      console.log(state.solution_map)
    },    

    mutateGuesses: (state, action) => {
      state.guesses = action.payload;
    },

    computeScore: (state) => {
      const temp_scores = [];

      if (state.guesses.length > 0) {

        for (let i = 0; i < state.guesses.length; i++) {
          const currPlayerId = state.guesses[i].PLAYER_ID;
          const currPlayerCorrectIdx = state.solution_map[currPlayerId];
          let diff = Math.abs(i - currPlayerCorrectIdx);
          if (diff > 0) {
            diff = 1;
          }
          temp_scores.push(diff);
        }

        state.scores = temp_scores;
      }
    },
  },
});

export default snapshotSlice.reducer;

export const { initializeGame , computeScore, mutateGuesses} = snapshotSlice.actions;
