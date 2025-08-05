"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { HelpCircle, Move, Trophy, Users } from "lucide-react";

const steps = [
  {
    icon: Users,
    title: "Get 5 Random NBA Players",
    description: "Each game session, you receive 5 random NBA players to rank",
  },
  {
    icon: Trophy,
    title: "Check The Metric",
    description: "Your metric is also randomized per session (eg. PPG, APG, RPG, etc.)",
  },
  {
    icon: Move,
    title: "Reorder Via Drag & Drop",
    description: "Arrange the list from highest to lowest",
  },
  {
    icon: HelpCircle,
    title: "3 Attempts",
    description:
      "Each attempt, you will be given the number of correct guesses, but not which guesses are correct",
  },
];

export function GuideDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-nba-orange" />
            How to Play
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="flex gap-3 bg-gray-900 p-3 rounded-lg border border-border"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm bg-orange-600 flex-shrink-0">
                  {index + 1}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="h-4 w-4 text-nba-orange" />
                    <h3 className="font-medium text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
