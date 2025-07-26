"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUserStore } from "@/store/useUserStore";
import {
  Flame,
  Play,
  Trophy,
  TrendingUp,
  BarChart3,
  ChartBar,
} from "lucide-react";

export function StatsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const user = useUserStore((state) => state.user);

  if (!user) return null;

  const statItems = [
    {
      title: "Games Played",
      value: user.gamesPlayed,
      icon: <Play className="w-5 h-5 text-nba-orange" />,
    },
    {
      title: "Games Won",
      value: user.gamesWon,
      icon: <Trophy className="w-5 h-5 text-nba-orange" />,
    },
    {
      title: "Current Streak",
      value: user.currentStreak,
      icon: <Flame className="w-5 h-5 text-nba-orange" />,
    },
    {
      title: "Longest Streak",
      value: user.longestStreak,
      icon: <TrendingUp className="w-5 h-5 text-nba-orange" />,
    },
    {
      title: "Avg. Attempts/Win",
      value: computeAvgAttempts(user),
      icon: <ChartBar className="w-5 h-5 text-nba-orange" />,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#121316] border-1 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white text-xl flex gap-3 items-center"><BarChart3 className="inline !size-6 text-nba-orange"/>Your Stats</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {statItems.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center p-4 rounded-lg bg-[#2a2b2f] text-white border border-[#444] ${
                idx === 4 ? "col-span-2 mx-auto w-1/2" : ""
              }`}
            >
              <div className="flex items-center gap-2 mb-1 text-md font-semibold">
                {item.icon}
                <span>{item.title}</span>
              </div>
              <div className="text-nba-orange text-2xl font-bold">{item.value}</div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function computeAvgAttempts(user: {
  guessDistribution: number[];
}): string {
  const totalWins = user.guessDistribution.reduce((a, b) => a + b, 0);
  if (totalWins === 0) return "—";
  const totalAttempts = user.guessDistribution.reduce(
    (sum, count, i) => sum + count * (i + 1),
    0
  );
  return (totalAttempts / totalWins).toFixed(1);
}
