import { create } from 'zustand';

export interface PlayerInterface {
  id: string;
  name: string;
  img?: string;
  statValue?: number;
}

export interface SessionStoreInterface {
  user_id: string;
  session_id: string;
  players: PlayerInterface[];
  metric: string;
  // metric: "Points Per Game" | "Assists Per Game" | "Rebounds Per Game" | "Games Played";
  attempts: 0 | 1 | 2 | 3;
  sessionStatus: "WON" | "LOST" | "ONGOING";
  solution: null | PlayerInterface[]; 
  previousAttemptCorrectGuesses: null | number;
  previousAttemptPlayerGuesses: null | PlayerInterface[];
  evals?: number[];
}

interface SessionState {
  session: SessionStoreInterface | null;
  setSession: (updates: Partial<SessionStoreInterface>) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  setSession: (updates) =>
    set((state) => ({
      session: state.session ? { ...state.session, ...updates } : { ...updates } as SessionStoreInterface,
    })),
}));
