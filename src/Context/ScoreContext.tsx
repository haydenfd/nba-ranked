import {
  createContext,
  useState,
  ReactNode,
  useContext,
  FC,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";

type ScoreType = [number, number, number, number, number];

type SolutionMap = {
  [key: string]: number;
};

interface Player {
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

type SelectedPlayers = Player[];

type ScoreContextType = {
  score: ScoreType;
  setScore: Dispatch<SetStateAction<ScoreType>>;
  computeScore: (selected: SelectedPlayers, soln_map: SolutionMap) => ScoreType;
  didUserWin: boolean;
  correctGuesses: Number;
};

const ScoreContext = createContext<ScoreContextType>({
  score: [-10, -10, -10, -10, -10],
  setScore: () => {},
  computeScore: (selected: SelectedPlayers, soln_map: SolutionMap) => [
    100, 100, 100, 100, 100,
  ],
  didUserWin: false,
  correctGuesses: -1,
});

export const ScoreContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [score, setScore] = useState<ScoreType>([-10, -10, -10, -10, -10]);
  const correctGuesses = useMemo(
    () => score.filter((value) => value === 0).length,
    [score],
  );
  const didUserWin = useMemo(
    () => score.every((value) => value === 0),
    [score],
  );

  const computeScore = (selected: SelectedPlayers, soln_map: SolutionMap) => {
    const temp_scores = [];

    for (let i = 0; i < selected.length; i++) {
      const currIdx = i;
      const currPlayerId = selected[i].PLAYER_ID;
      const currPlayerCorrectIdx = soln_map[currPlayerId];
      let diff = Math.abs(currIdx - currPlayerCorrectIdx);
      if (diff > 2) {
        diff = -1;
      }
      temp_scores.push(diff);
    }

    console.log(`Computed scores: ${temp_scores}`);
    const typecasted_score = temp_scores as ScoreType;
    setScore(typecasted_score);
    return typecasted_score;
  };

  return (
    <ScoreContext.Provider
      value={{ score, setScore, didUserWin, correctGuesses, computeScore }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export const useScoreContext = () => useContext(ScoreContext);
