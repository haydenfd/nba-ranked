// src/contexts/GameStateContext.js
import React, { createContext, useState } from "react";

export const GameStateContext = createContext();

const DEFAULT_GAME_STATE = {
  attempts: 0,
  items: [],
  selected: [],
  soln_map: {},
  scores: [],
  snapshot: {},
  status: 0,
};

export const GameStateProvider = ({ children }) => {
  const [gameState, setGameState] = useState(DEFAULT_GAME_STATE);

  const didUserWin =
    gameState.scores.length === 5 &&
    gameState.scores.every((value) => value === 0);
  const didUserLose = !didUserWin && gameState.attempts === 3;
  const correctGuesses = gameState.scores.filter((value) => value === 0).length;
  const canSubmitGuess =
    !didUserWin &&
    !didUserLose &&
    gameState.items.length === 0 &&
    gameState.selected.length === 5; // TODO: Tweak

  const computeScores = (selected, soln_map) => {
    let scores_computed = [];
    let snapshot_computed = [];
    for (let n = 0; n < gameState.selected.length; n++) {
      const currIdx = n;
      const currPlayer = gameState.selected[n];
      snapshot_computed.push(currPlayer);

      const solnMapIdx = gameState.soln_map[currPlayer.PLAYER_ID];

      let playerEval = Math.abs(currIdx - solnMapIdx);
      if (playerEval > 1) {
        playerEval = -1;
      }

      scores_computed.push(playerEval);
    }

    setScores(scores_computed);
    return scores_computed;
  };

  const saveSnapshot = () => {
    let snap = {
      items: [],
      selected: [],
    };
    for (let i = 0; i < gameState.items.length; i++) {
      snap.items.push(gameState.items[i]);
    }

    for (let j = 0; j < gameState.selected.length; j++) {
      snap.selected.push(gameState.selected[j]);
    }

    setGameState((prev) => ({
      ...prev,
      snapshot: snap,
    }));

    localStorage.setItem("snapshot", JSON.stringify(snap));
    console.log(snap);
    return snap;
  };

  const makeGuess = () => {
    const newAttempt = gameState.attempts + 1;
    setAttempts(newAttempt);
    localStorage.setItem("attempts", String(newAttempt));
    return newAttempt;
  };

  const handleSubmit = () => {
    // first, compute scores and check if user got soln. If so, set session_status to 1 for WON
    // at the same time, also push each selected/guess to the snapshot

    let scores = computeScores(gameState.selected, gameState.soln_map);
    let snap = saveSnapshot();
    let newAttempt = makeGuess();
    if (didUserWin) {
      console.log("Lmao");
      setGameState((prev) => ({ ...prev, status: 1 }));
    } else if (didUserLose) {
      console.log("Lost");
      setGameState((prev) => ({ ...prev, status: -1 }));
    } else {
    }
    // let scores_computed = [];
    // let snapshot_computed = [];
    // for (let n = 0; n < gameState.selected.length; n++) {

    //   const currIdx = n;
    //   const currPlayer = gameState.selected[n];
    //   snapshot_computed.push(currPlayer);

    //   const solnMapIdx = gameState.soln_map[currPlayer.PLAYER_ID];

    //   let playerEval = Math.abs(currIdx - solnMapIdx);
    //   if (playerEval > 1) {
    //     playerEval = -1;
    //   }

    //   scores_computed.push(playerEval);
    // }

    // const didUserWin = scores_computed.every(value => value === 0);

    // if (didUserWin) {
    //   setGameState((prevState) => ({
    //     ...prevState,
    //     session_status: 1,
    //     attempts: gameState.attempts + 1,
    //     snapshot: snapshot_computed,
    //   }));

    // }

    // else {
    //   const newAttempts = gameState.attempts + 1;
    //   const didUserLose = newAttempts === 3;

    //   if (didUserLose) {
    //     setGameState((prevState) => ({
    //       ...prevState,
    //       session_status: -1,
    //       attempts: 3,
    //       snapshot: snapshot_computed,
    //     }));

    //   }
    // }

    // localStorage.setItem()
  };

  const setAttempts = (num) => {
    setGameState((prevState) => ({
      ...prevState,
      attempts: num,
    }));
  };

  const incrementAttempts = () => {
    const newAttempts = gameState.attempts + 1;

    setGameState((prevState) => ({
      ...prevState,
      attempts: newAttempts,
      sessionStatus: newAttempts === 3 ? -1 : 0,
    }));

    console.log("You lost!");
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

  const setSnapshot = (_items) => {
    setGameState((prevState) => {
      return { ...prevState, snapshot: _items };
    });
  };

  const setSolnMap = (_items) => {
    setGameState((prevState) => {
      return { ...prevState, soln_map: _items };
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

  // const onSubmit = () => {

  //   const scores_comp = [];
  //   const snap = [];

  //   for (let i = 0; i < gameState.selected.length; i++) {
  //     const currIdx = i;
  //     const currPlayerId = gameState.selected[i].PLAYER_ID;
  //     snap.push(gameState.selected[i]);
  //     const solnMapIdx = gameState.soln_map[currPlayerId];
  //     let abs_diff = Math.abs(currIdx - solnMapIdx);

  //     if (abs_diff > 1) {
  //       abs_diff = -1
  //     }

  //     scores_comp.push(abs_diff);
  //   }

  //   setScores(scores_comp);
  //   setGameState((prev) => {
  //     return {...prev, snapshot: snap}
  //   })

  //   console.log(scores_comp);

  //   let count = 0;
  //   for (let i = 0; i < scores_comp.length ; i++) {
  //     if (scores_comp[i] === 0) {
  //       count += 1;
  //     }
  //   }

  //   if (count === 5) {
  //     setGameState((prev) => ({...prev, sessionStatus: 1}))
  //     console.log('You won!');
  //   }

  //   localStorage.setItem("snapshot", JSON.stringify(gameState.selected));

  //   return count;
  // };

  return (
    <GameStateContext.Provider
      value={{
        setSolnMap,
        gameState,
        incrementAttempts,
        moveToItems,
        moveToSelected,
        setItems,
        canSubmit,
        setSelected,
        handleSubmit,
        setAttempts,
        setSnapshot,
        correctGuesses,
        canSubmitGuess,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};
