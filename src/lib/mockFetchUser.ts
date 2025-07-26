import type { UserInterface } from "@/store/useUserStore";

export async function mockFetchUser(): Promise<UserInterface> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                userId: '34334', 
                gamesPlayed: 20,
                gamesWon: 11,
                currentStreak: 4,
                longestStreak: 5,
                guessDistribution: [3,4,4],
            });
        }, 750);
    })
}