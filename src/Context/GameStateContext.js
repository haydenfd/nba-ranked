// src/contexts/GameStateContext.js
import React, { createContext, useState } from 'react';

// Create the context
export const GameStateContext = createContext();

export const GameStateProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    attempts: 0,
    items: [],
    selected: [],
  });

  const incrementAttempts = () => {
    setGameState(prevState => ({ ...prevState, attempts: prevState.attempts + 1 }));
  };

  const resetGame = () => {
    setGameState({
        attempts: 0,
    });
  };

  const moveToSelected = (item) => {
    setGameState(prevState => {
      const items = prevState.items.filter(i => i !== item);
      const selected = [...prevState.selected, item];
      const canSubmit = selected.length === 5;

      return { ...prevState, items, selected, canSubmit };
    });
  };

  const moveToItems = (item) => {
    setGameState(prevState => {
      const selected = prevState.selected.filter(i => i !== item);
      const items = [...prevState.items, item];
      const canSubmit = selected.length === 5;

      return { ...prevState, items, selected, canSubmit };
    });
  };


  const setItems = (_items) => {
    setGameState(prevState => {

        return { ...prevState, items: _items}
    })
  }

  const setSelected = (_items) => {
    setGameState(prevState => {

        return { ...prevState, selected: _items}
    })
  }

  const canSubmit = () => {
    return gameState.attempts !== 3 && gameState.selected.length === 5 && gameState.items.length === 0;
  }
  return (
    <GameStateContext.Provider value={{ gameState, incrementAttempts, resetGame, moveToItems, moveToSelected, setItems, canSubmit, setSelected }}>
      {children}
    </GameStateContext.Provider>
  );
};
