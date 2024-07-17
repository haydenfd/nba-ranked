// src/contexts/GameStateContext.js
import React, { createContext, useState } from "react";

// Create the context
export const GameStateContext = createContext();

export const GameStateProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    attempts: 0,
    items: [],
    selected: [],
    correct: {},
    scores: [],
  });

  const incrementAttempts = () => {
    setGameState((prevState) => ({
      ...prevState,
      attempts: prevState.attempts + 1,
    }));
  };

  const resetGame = () => {
    setGameState({
      attempts: 0,
    });
  };

  const moveToSelected = (item) => {
    setGameState((prevState) => {
      const items = prevState.items.filter((i) => i !== item);
      const selected = [...prevState.selected, item];
      const canSubmit = selected.length === 5;

      return { ...prevState, items, selected, canSubmit };
    });
  };

  const moveToItems = (item) => {
    setGameState((prevState) => {
      const selected = prevState.selected.filter((i) => i !== item);
      const items = [...prevState.items, item];
      const canSubmit = selected.length === 5;

      return { ...prevState, items, selected, canSubmit };
    });
  };

  const setItems = (_items) => {
    setGameState((prevState) => {
      return { ...prevState, items: _items };
    });
  };

  const setSelected = (_items) => {
    setGameState((prevState) => {
      return { ...prevState, selected: _items };
    });
  };

  const setCorrect = (_items) => {
    const map = {};

    for (let i = 0; i < _items.length; i++) {
      const currPlayer = _items[i];
      map[currPlayer.PLAYER_NAME] = i;
    }

    setGameState((prevState) => {
      return { ...prevState, correct: map };
    });
  };

  const setScores = (_items) => {
    setGameState((prevState) => {
      return { ...prevState, scores: _items };
    });
  };

  const canSubmit = () => {
    return (
      gameState.attempts !== 3 &&
      gameState.selected.length === 5 &&
      gameState.items.length === 0
    );
  };

  const onSubmit = () => {
    console.log(gameState.correct);

    let res = [];
    for (let i = 0; i < gameState.selected.length; i++) {
      const selectedPlayerIdx = i;
      const correctPlayerIdx =
        gameState.correct[gameState.selected[i].PLAYER_NAME];
      let ev = Math.abs(correctPlayerIdx - selectedPlayerIdx);

      if (ev > 1) {
        ev = -1;
      }
      // console.log(`${gameState.selected[i].PLAYER_NAME} : ${ev}`);
      res.push(ev);
    }
    setScores(res);
    let count = 0;
    for (let i = 0; i < res.length; i++) {
      if (res[i] === 0) {
        count += 1;
      }
    }
    return count;
  };

  return (
    <GameStateContext.Provider
      value={{
        setCorrect,
        gameState,
        incrementAttempts,
        resetGame,
        moveToItems,
        moveToSelected,
        setItems,
        canSubmit,
        setSelected,
        onSubmit,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};
