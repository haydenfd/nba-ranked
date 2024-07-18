import React, { useContext, useEffect, useState } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { GameStateContext } from "../Context/GameStateContext";

export const GuessCrumbs = () => {
  const { gameState } = useContext(GameStateContext);

  useEffect(() => {
    console.log("change");
  }, [gameState.snapshot]);
  return (
    <div className={`w-full mx-auto flex justify-center `}>
      <Breadcrumbs className="bg-white p-4 rounded mx-auto">
        {gameState.snapshot.selected > 0 &&
          gameState.snapshot.selected.map((item, idx) => (
            <BreadcrumbItem
              classNames={{
                item: `text-2xl text-red-400  ${gameState.scores[idx] === 0 ? "text-green-400" : gameState.scores[idx] === -1 ? "text-red-400" : "text-yellow-500"}`,
                separator: `text-2xl text-black font-bold`,
              }}
              disableAnimation={true}
            >
              {item.PLAYER_NAME}
            </BreadcrumbItem>
          ))}
      </Breadcrumbs>
    </div>
  );
};
