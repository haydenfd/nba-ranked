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

const solution_map_init = {
  "2544": 0,
  "101108": 3,
  "202681": 1,
  "202710": 2,
  "1629642": 4,
};


interface SnapshotState {
  players: PlayerDataInterface[] | null;
  guesses: PlayerDataInterface[];
  solution_map: SolutionMapInterface;
  scores: number[];
}

const initialSnapshotState: SnapshotState = {
  players: [],
  guesses: [],
  solution_map: {
    "2544": 0,
    "101108": 3,
    "202681": 1,
    "202710": 2,
    "1629642": 4,
  },
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
    },    

    mutateGuesses: (state, action) => {
      state.guesses = action.payload;
      console.log(state.guesses);
    },

    computeScore: (state) => {
      const temp_scores = [];
      console.log('65')
      if (state.guesses.length > 0) {
        console.log('ran');
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
        console.log(temp_scores);
      }
    },
  },
});

export default snapshotSlice.reducer;

export const { initializeGame , computeScore, mutateGuesses} = snapshotSlice.actions;
