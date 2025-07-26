'use client';

import { Send, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PlayerList from '@/components/player_list';
import { mockFetchUser } from "@/lib/mockFetchUser";
import Header from '@/components/header';
import { useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';

export default function Home() {

const user = useUserStore((s) => s.user);
const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    const initUser = async () => {
      const existingId = localStorage.getItem("user_id");

      if (!existingId) {
        const newUser = await mockFetchUser(); 
        console.log(newUser);
        localStorage.setItem("user_id", newUser.userId);
        setUser(newUser);
      } else {
        const existingUser = await mockFetchUser(); 
         console.log(existingUser);
        setUser(existingUser);
      }
    };

    initUser();
  }, [setUser]);

  return (
    <div className="flex flex-col justify-center items-center">
           <Header />      
      <div className="flex justify-center items-center mt-4">
        <p className="text-md text-gray-300">
          Rank by:{" "}
          <span className="text-[#f37c32] uppercase font-medium">Points Per Game</span>
          {" · "}
          <span className="text-yellow-400 font-medium">3 attempts left</span>
        </p>
      </div>
      <div className="flex justify-center items-center mt-4">
        <p className="text-md text-gray-300">
          Last attempt: 3 correct
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
