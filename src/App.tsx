import React from "react";
import { Main } from "./Pages/Main";
import { GameStateProvider } from "./Context/GameStateContext";

function App() {
  return (
    <>
      <GameStateProvider>
        <Main />
      </GameStateProvider>
    </>
  );
}

export default App;
