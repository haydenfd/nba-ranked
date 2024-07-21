import React, { useState, useEffect } from "react";
import { Drag } from "../Components/Draggable";
import { GuessCrumbs } from "../Components/Crumbs";
import { Nav } from "../Components";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";

export const Main = () => {
  const attempts = useSelector((state: RootState) => state.attempts.attempts);

  return (
    <div className="w-full h-full flex flex-col pb-10">
      <Nav />
      <section className="w-3/5 mx-auto text-center my-4">
        <h2 className="font-bold text-white text-3xl">
          ATTEMPTS LEFT: {3 - attempts}
        </h2>
      </section>
      <GuessCrumbs />
      <Drag />
    </div>
  );
};

// import React, { useContext, useEffect, useState } from "react";
// import { Nav } from "../Components";
// import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
// import { Drag } from "../Components/Draggable";
// import { Button } from "@nextui-org/react";
// import { GameStateContext } from "../Context/GameStateContext";
// import { GuessCrumbs } from "../Components/Crumbs";
// import { toast, Toaster } from "sonner";
// import { useScoreContext } from "../Context/ScoreContext";
// import { useSelector } from "react-redux";
// import { RootState } from "../Store/store";
// import { useDispatch } from "react-redux";

// export const Main = () => {

//   const attempts = useSelector((state:RootState) => state.attempts.attempts);
//   const dispatch = useDispatch();

//     const {
//       correctGuesses,
//       computeScore,
//       didUserWin,
//     } = useScoreContext();

//   const {
//     gameState,
//     setItems,
//     setSolnMap,
//     setSelected,
//     setSnapshot,
//     handleSubmit,
//   } = useContext(GameStateContext);

//   useEffect(() => {
//     // check if new user via localStorage
//     if (!localStorage.getItem("user_uuid")) {
//       const initUser = async () => {
//         axios.get(`http://localhost:8080/init-user`).then((res) => {
//           console.log(res.data);

//           const { user_uuid, session_uuid, players, soln_map } = res.data;

//           localStorage.setItem("user_uuid", user_uuid);
//           localStorage.setItem("session_uuid", session_uuid);

//           localStorage.setItem("players", JSON.stringify(players));
//           // localStorage.setItem("attempts", JSON.stringify(0));
//           localStorage.setItem("soln_map", JSON.stringify(soln_map));
//           localStorage.setItem("session_status", String(0)); // 0 => ongoing, -1 => user lost, 1 => user won

//           setItems(players);
//           setSolnMap(soln_map);
//         });
//       };

//       initUser();
//     } else {
//       const x = localStorage.getItem("soln_map");
//       if (x) {
//         setSolnMap(JSON.parse(x));
//       }
//       const y = localStorage.getItem("snapshot");
//       if (y) {
//         setSelected(JSON.parse(y));
//         setSnapshot(JSON.parse(y));
//       }
//     }
//   }, []);

//   return (
//     <div className="w-full h-full flex flex-col pb-10">
//       <Nav />
//       <section className="w-3/5 mx-auto text-center my-4">
//         <h2 className="font-bold text-white text-3xl">
//           ATTEMPTS LEFT: {3 - attempts}
//         </h2>
//       </section>
//       {/* <GuessCrumbs /> */}
//       <div className="flex-1 mt-8 w-11/12 mx-auto">
//         <Drag />
//       </div>
//       <p>{correctGuesses().toString()}</p>
//       <div className="mt-10 gap-8 w-full mx-auto flex justify-center">
//         {/* <Button
//         onClick={() => dispatch(reset())}
//           className="p-6 bg-slate-300 border-[6px] border-slate-700 text-slate-700 text-lg rounded-none font-bold hover:bg-slate-850  hover:border-black"
//         >
//           Reset
//         </Button>
//         <Button
//           onClick={() => {
//             dispatch(increment());
//             let newScore = computeScore(gameState.selected, gameState.soln_map);
//             console.log(gameState.selected);
//             console.log(`new score: ${newScore}`);
//             console.log( `did user win: ${didUserWin()}`);
//           }}
//           className="p-6 bg-slate-300 border-[6px] border-slate-700 text-slate-700 text-lg rounded-none font-bold hover:bg-slate-850  hover:border-black"
//         >
//           Submit
//         </Button> */}
//         <Toaster
//           position="top-center"
//           expand={false}
//           toastOptions={{
//             style: {
//               background: "red",
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// };
