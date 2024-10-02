import React, { useEffect } from "react";
import { Drag } from "../Components/Game/Draggable";
import { GuessCrumbs } from "../Components/Game/Crumbs";
import { Nav } from "../Components/Nav";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store/store";
import { Toaster, toast } from "sonner";
import { SolutionModal } from "../Components/Modals/SolutionModal"; 
import { useDisclosure } from "@nextui-org/react"; 
import { setPlayers, setSolutionMap } from "../Store/Snapshot/snapshotSlice";
import axios from "axios";

export const Main = () => {

  const attempts = useSelector((state: RootState) => state.attempts.attempts);
  const score = useSelector((state: RootState) => state.snapshot.score);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const initializeUser = async () => {
    const response = await axios.post('http://localhost:8080/users/create');
    const newUserId = response.data.user_id;
    const newSessionId = response.data.session_id;
    const players = response.data.players;
    return { 
      newUserId, 
      newSessionId,
      players,
    };
  };

  useEffect(() => {
    const checkUser = async () => {
      const storedUserId = localStorage.getItem('rank_five_user_id');

      if (!storedUserId) {
        console.log("Could not find user.");
        const { newUserId, newSessionId, players } = await initializeUser(); 
        localStorage.setItem('rank_five_user_id', newUserId); 
        localStorage.setItem('rank_five_session_id', newSessionId); 
        console.log(players);
      } else {
        // console.log(`Found: ${storedUserId}`);
      }
    };

    checkUser(); 
  }, []); 

  useEffect(() => {
    console.log(`Score is now ${score}`);

    if (attempts === 3 || score.length > 0) {
      const correctGuesses = score.filter((s) => s !== -1).length;
      if (correctGuesses === 5) {

        onOpen(); // Open the modal
      }
    }

    if (attempts < 3 && score.length > 0) {
      const correctGuesses = score.filter((s) => s !== -1).length;

      if (correctGuesses < 5) {
        toast(
          `You got ${correctGuesses} guess${
            correctGuesses === 1 ? "" : "es"
          } right!`,
          {
            position: "top-center",
            duration: 3000,
          }
        );
      }
    }
  }, [score, attempts, onOpen]);

  return (
    <div className="w-full h-full flex flex-col pb-4">
      <Nav />
      <Toaster position="top-center" richColors /> {/* Toast notifications */}
      <SolutionModal
        correctGuesses={score.filter((s) => s !== -1).length}
        isOpen={isOpen}
        onOpenChange={onOpenChange} // Close modal on trigger
      /> {/* Modal for end game condition */}
      <section className="w-3/5 mx-auto text-center my-8">
        <h2 className="font-bold text-white text-3xl">
          ATTEMPTS LEFT: {3 - attempts}
        </h2>
      </section>
      <GuessCrumbs isVisible={attempts > 0} />
      <Drag />
    </div>
  );
};
