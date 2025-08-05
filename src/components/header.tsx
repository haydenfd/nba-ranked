"use client";

import { Button } from "@/components/ui/button";
import { CircleQuestionMark, ChartColumn } from "lucide-react";
import { GuideDialog } from "@/components/guide_dialog";
import { StatsDialog } from "@/components/stats_dialog";
import { useState } from "react";

export default function Header() {
  const [guideOpen, setGuideOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);

  return (
    <>
      <header className="w-full px-6 py-6 flex items-center justify-between border-b-2 border-[#2B2E33] text-white bg-[#191b20]">
        <Button
          variant="ghost"
          className="text-white py-5 text-lg hover:text-[#f37c32] hover:bg-yellow-300 flex items-center gap-2"
          onClick={() => setStatsOpen(true)}
        >
          <ChartColumn className="!size-5" />
          Stats
        </Button>
        <h1 className="text-4xl underline font-bold text-nba-orange">NBA Ranked</h1>
        <Button
          variant="ghost"
          onClick={() => setGuideOpen(true)}
          className="text-white text-lg py-5 hover:text-[#f37c32] hover:bg-yellow-300 flex items-center gap-2"
        >
          <CircleQuestionMark className="!size-5" />
          Guide
        </Button>
      </header>
      <GuideDialog open={guideOpen} onOpenChange={setGuideOpen} />
      <StatsDialog open={statsOpen} onOpenChange={setStatsOpen} />
    </>
  );
}
