import React, { useState, useEffect } from "react";
import { Drag } from "../Components/Game/Draggable";
import { GuessCrumbs } from "../Components/Game/Crumbs";
import { Nav } from "../Components/Nav";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";

export const Main = () => {

  useEffect(() => {

  }, [])
  
  const attempts = useSelector((state: RootState) => state.attempts.attempts);

  return (
    <div className="w-full h-full flex flex-col pb-10">
      <Nav />
      <section className="w-3/5 mx-auto text-center my-4">
        <h2 className="font-bold text-white text-3xl">
          ATTEMPTS LEFT: {3 - attempts}
        </h2>
      </section>
      <GuessCrumbs isVisible={attempts > 0}/>
      <Drag />
    </div>
  );
};
