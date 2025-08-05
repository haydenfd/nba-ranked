'use client';

import { useState } from 'react';
import { Send, RotateCcw, Eye, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import { useUserStore } from '@/store/useUserStore';
import { useSessionStore } from '@/store/useSessionStore';

import {
  DndContext,
  rectIntersection,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PlayerInterface } from '@/store/useSessionStore';
import Image from "next/image";
import { Toaster } from "@/components/ui/sonner";
import { SolutionDialog } from "@/components/solution_dialog";
import { useInitUserAndSession } from '@/hooks/useInitUserAndSession';
import { useHandleAttempt } from '@/hooks/useHandleAttempt';

function SortableItem({ id, player }: { id: string; player: PlayerInterface }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-4 my-2 bg-[#242424] border-2 border-gray-500 rounded-md cursor-grab text-white flex items-center space-x-4 transition-shadow duration-300 
        hover:shadow-[0_0_12px_4px_#f97316]
        ${isDragging ? "shadow-[0_0_20px_6px_#f97316]" : ""}`}
    >
      <div className="relative w-13 h-13 rounded-full overflow-hidden bg-white ml-12">
        <Image
          src={player.img || ""}
          alt={player.name}
          fill
          style={{
            objectFit: "contain",
            objectPosition: "center top",
          }}
          quality={100}
        />
      </div>
      <p className="text-lg">{player.name}</p>
    </div>
  );
}

export default function Home() {
  const user = useUserStore((s) => s.user);
  const session = useSessionStore((s) => s.session);
  const setSession = useSessionStore((s) => s.setSession);
  const [players, setPlayers] = useState<PlayerInterface[]>([]);
  const [showSolution, setShowSolution] = useState(false);

  const attemptsLeft = session ? 3 - session.attempts : 3;
  const lastCorrect = session?.previousAttemptCorrectGuesses ?? null;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = players.findIndex((p) => p.id === active.id);
    const newIndex = players.findIndex((p) => p.id === over.id);
    setPlayers(arrayMove(players, oldIndex, newIndex));
  };

  useInitUserAndSession(setPlayers, setShowSolution);

  const { handleSubmitAttempt, handleResetAttempt } = useHandleAttempt(
    players,
    setPlayers,
    setShowSolution
  );

  const handleStartNewGame = async () => {
    const res = await fetch("/api/create-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user?.user_id }),
    });

    if (res.ok) {
      const newSession = await res.json();
      localStorage.setItem("session_id", newSession.session_id);
      setSession(newSession);
      setPlayers(newSession.players);
      setShowSolution(false);
    } else {
      console.error("Failed to start new game");
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-[#0f0f0f] text-white">
      <Header />
      <Toaster />
      <main className="flex flex-col items-center justify-start flex-1 w-full mt-6">
        {!session ? (
          <p className="text-lg text-gray-400">Loading session...</p>
        ) : (
          <>
            <div className="flex justify-center items-center mt-4">
              <p className="text-md text-gray-300">
                Rank by:{" "}
                <span className="text-[#f37c32] uppercase font-medium">
                  {session.metric.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                {" · "}
                <span className="text-yellow-400 font-medium">
                  {attemptsLeft} attempt{attemptsLeft === 1 ? "" : "s"} left
                </span>
              </p>
            </div>

            <div className="flex justify-center items-center mt-4">
              <p className={`text-md text-gray-300 ${lastCorrect === null ? "invisible" : "visible"}`}>
                Last attempt: {lastCorrect} correct
              </p>
            </div>

            <div className="w-1/2 mt-6 px-4">
              <DndContext sensors={sensors} collisionDetection={rectIntersection} onDragEnd={handleDragEnd}>
                <div className="p-6 w-full border-2 border-gray-600 rounded-xl bg-transparent">
                  <SortableContext items={players} strategy={verticalListSortingStrategy}>
                    {players.map(player => (
                      <SortableItem key={player.id} id={player.id} player={player} />
                    ))}
                  </SortableContext>
                </div>
              </DndContext>
            </div>

            <div className="flex justify-center items-center gap-6 w-full mt-6">
              {session.sessionStatus === "WON" || session.sessionStatus === "LOST" ? (
                <>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setShowSolution(true)}
                  >
                    <Eye className="!size-5" />
                    See Solution
                  </Button>
                  <Button
                    variant="gradient"
                    size="lg"
                    onClick={handleStartNewGame}
                  >
                    <PlusCircle className="!size-5" />
                    Start New Game
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    disabled={session.attempts === 0}
                    onClick={handleResetAttempt}
                  >
                    <RotateCcw className="!size-5" />
                    Reset to Last Attempt
                  </Button>
                  <Button
                    variant="gradient"
                    size="lg"
                    disabled={session.attempts >= 3}
                    onClick={handleSubmitAttempt}
                  >
                    <Send className="!size-5" />
                    Submit Guess
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </main>

      <SolutionDialog open={showSolution} onOpenChange={setShowSolution} />
      <div className='w-full text-center mt-4 mb-12'>
        <p className='text-md text-gray-300'>
          Stats last updated on <span className='inline font-semibold'>Aug 4, 2025</span>
        </p>
      </div>
    </div>
  );
}
