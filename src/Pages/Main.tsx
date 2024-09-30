import React, { useEffect, useState } from "react";
import { Drag } from "../Components/Game/Draggable";
import { GuessCrumbs } from "../Components/Game/Crumbs";
import { Nav } from "../Components/Nav";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { Toaster, toast } from "sonner";
import { SolutionModal } from "../Components/Modals/SolutionModal"; 

export const Main = () => {
  // Access attempts and score from Redux store
  const attempts = useSelector((state: RootState) => state.attempts.attempts);
  const score = useSelector((state: RootState) => state.snapshot.score);

  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log(`Score is now ${score}`);

    // Open the modal when attempts === 3 or all score elements are 1
    if (attempts === 3 || score.length > 0) {
      const correctGuesses = score.filter((s) => s !== 1).length;

      if (correctGuesses === 5) {
        setIsModalOpen(true);
      }
    } else {
      setIsModalOpen(false);
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
  }, [score, attempts]);

  return (
    <div className="w-full h-full flex flex-col pb-10">
      <Nav />
      <Toaster position="top-center" richColors /> {/* Toast notifications */}
      <SolutionModal
        correctGuesses={score.filter((s) => s !== -1).length}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      /> {/* Modal for end game condition */}
      <section className="w-3/5 mx-auto text-center my-4">
        <h2 className="font-bold text-white text-3xl">
          ATTEMPTS LEFT: {3 - attempts}
        </h2>
      </section>
      <GuessCrumbs isVisible={attempts > 0} />
      <Drag />
    </div>
  );
};
