import {create} from 'zustand';

export interface UserInterface {
  user_id: string;
  games_played: number;
  games_won: number;
  current_streak: number;
  longest_streak: number;
  attempts_per_win_distribution: [number, number, number];
}

export interface UserStoreInterface {
    user: UserInterface | null;
    setUser: (newUser: UserInterface) => void;
    updateStats: (updates: Partial<UserInterface>) => void;
}


export const useUserStore = create<UserStoreInterface>((set) => ({
    user: null,
    setUser: (newUser) =>{ 
        set({ user: newUser})
    },
    updateStats: (updates) => 
        set((state) => ({
            user: state.user ? { ...state.user, ...updates} : null
        }))
}));