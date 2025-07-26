import {create} from 'zustand';

export interface UserStatsInterface {
    gamesPlayed: number;
    gamesWon: number;
    currentStreak: number;
    longestStreak: number;
    guessDistribution: number[];
}

export interface UserInterface extends UserStatsInterface {
    userId: string;
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