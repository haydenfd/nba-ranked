"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSessionStore } from "@/store/useSessionStore";
import Image from "next/image";

export function SolutionDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const session = useSessionStore((state) => state.session);

  if (!session || !session.solution) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#121316] border-1 border-gray-700">
        <DialogHeader className="w-full flex justify-center items-center">
          <DialogTitle
            className={`text-xl uppercase flex gap-3 items-center font-bold ${
              session.sessionStatus === "WON" ? "text-green-400" : "text-red-500"
            }`}
          >
            {session.sessionStatus === "WON" ? "You Won!" : "You Lost"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          {session.solution.map((player, idx) => {
            const isCorrect = session.evals?.[idx] === 1;
            return (
              <div
                key={player.id}
                className={`flex items-center justify-between p-4 rounded-md border border-gray-600 ${
                  isCorrect ? "bg-green-700/50" : "bg-red-700/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-13 h-13 rounded-full overflow-hidden bg-white">
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
                  <p className="text-white text-lg">{player.name}</p>
                </div>
                <p className="text-nba-orange text-xl font-semibold">
                  {player.statValue ?? "-"}
                </p>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
