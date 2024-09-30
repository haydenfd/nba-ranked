import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PlayerData {
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

const selected_init = [
  {
    _id: "669567863ef13914a0300ca3",
    PLAYER_NAME: "LeBron James",
    PLAYER_ID: "2544",
    FROM_YEAR: 2003,
    PPG: 27.1,
    GP: 1484,
    EXP: 21,
    TO_YEAR: 2024,
    __v: 0,
  },
  {
    _id: "669567863ef13914a0300a73",
    PLAYER_NAME: "Kyrie Irving",
    PLAYER_ID: "202681",
    FROM_YEAR: 2011,
    PPG: 23.8,
    GP: 781,
    EXP: 13,
    TO_YEAR: 2024,
    __v: 0,
  },
  {
    _id: "669567863ef13914a0300d7c",
    PLAYER_NAME: "Jimmy Butler",
    PLAYER_ID: "202710",
    FROM_YEAR: 2011,
    PPG: 18.4,
    GP: 869,
    EXP: 13,
    TO_YEAR: 2024,
    __v: 0,
  },
  {
    _id: "669567863ef13914a0300dcd",
    PLAYER_NAME: "Chris Paul",
    PLAYER_ID: "101108",
    FROM_YEAR: 2005,
    PPG: 17.6,
    GP: 1262,
    EXP: 19,
    TO_YEAR: 2024,
    __v: 0,
  },
  {
    _id: "669567863ef13914a0300d22",
    PLAYER_NAME: "Nassir Little",
    PLAYER_ID: "1629642",
    FROM_YEAR: 2019,
    PPG: 5.6,
    GP: 231,
    EXP: 5,
    TO_YEAR: 2024,
    __v: 0,
  },
];
const solution_map_init = {
  "2544": 0,
  "101108": 3,
  "202681": 1,
  "202710": 2,
  "1629642": 4,
};
const scores_init = [0, 1, 0, 1, 0];

interface SnapshotState {
  selected: PlayerData[] | null;
  solution_map: SolutionMapInterface | null;
  score: number[];
}

const initialSnapshotState: SnapshotState = {
  selected: selected_init,
  solution_map: solution_map_init,
  score: scores_init,
};

const snapshotSlice = createSlice({
  name: "snapshot",
  initialState: initialSnapshotState,
  reducers: {
    setSelectedStore: (state, action: PayloadAction<PlayerData[]>) => {
      state.selected = action.payload;
    },
    computeScore: (state) => {
      const temp_scores = [];
      if (state.selected && state.solution_map) {
        for (let i = 0; i < state.selected.length; i++) {
          const currPlayerId = state.selected[i].PLAYER_ID;
          const currPlayerCorrectIdx = state.solution_map[currPlayerId];
          let diff = Math.abs(i - currPlayerCorrectIdx);
          if (diff > 0) {
            diff = -1;
          }
          temp_scores.push(diff);
        }

        state.score = temp_scores;
      }
      //  console.log(state.score);
    },
  },
});

export default snapshotSlice.reducer;

export const { computeScore, setSelectedStore } = snapshotSlice.actions;
