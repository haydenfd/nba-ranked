interface GenericModalsPropsInterface {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

interface SolutionModalPropsInterface extends GenericModalsPropsInterface {
  result: "WON" | "LOST";
}

interface StatsBoxPropsInterface {
  value: string;
  ctx: string;
}

interface StatsModalStateInterface {
  games_played: number;
  wins: number;
  longest_streak: number;
  current_streak: number;
  attempts_distribution: [number, number, number];
}

export { SolutionModalPropsInterface, GenericModalsPropsInterface, StatsBoxPropsInterface, StatsModalStateInterface };
