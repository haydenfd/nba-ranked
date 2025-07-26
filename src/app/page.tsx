'use client';

import { Send, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PlayerList from '@/components/player_list';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center items-center mt-4">
        <p className="text-md text-gray-300">
          Rank by:{" "}
          <span className="text-[#f37c32] uppercase font-medium">Points Per Game</span>
          {" · "}
          <span className="text-yellow-400 font-medium">3 attempts left</span>
        </p>
      </div>

      <div className="w-1/2 mt-6 px-4">
        <PlayerList />
      </div>

      <div className="flex justify-center items-center gap-6 w-full mt-6">
        <Button variant="outline" size="lg">
          <RotateCcw className="!size-5" />
          Reset to Last Attempt
        </Button>
        <Button variant="gradient" size="lg">
          <Send className="!size-5" />
          Submit Guess
        </Button>
      </div>
    </div>
  );
}
