import React from "react";
import { Main } from "./Pages/Main";
import { GameStateProvider } from "./Context/GameStateContext";
import { AttemptsContextProvider } from "./Context/AttemptsContext";
import { ScoreContextProvider } from "./Context/ScoreContext";

export function App() {
  return (
    <>
      <ScoreContextProvider>
      <AttemptsContextProvider>
        <GameStateProvider>
          <Main />
        </GameStateProvider>
      </AttemptsContextProvider>
      </ScoreContextProvider>
    </>
  );
}
