import { toast } from "sonner";
import { useUserStore } from "@/store/useUserStore";
import { useSessionStore } from "@/store/useSessionStore";
import { PlayerInterface } from "@/store/useSessionStore";

export function useHandleAttempt(
  players: PlayerInterface[],
  setPlayers: (players: PlayerInterface[]) => void,
  setShowSolution: (b: boolean) => void
) {
  const user = useUserStore((s) => s.user);
  const session = useSessionStore((s) => s.session);
  const setUser = useUserStore((s) => s.setUser);
  const setSession = useSessionStore((s) => s.setSession);

  const handleResetAttempt = () => {
    if (session?.previousAttemptPlayerGuesses) {
      setPlayers(session.previousAttemptPlayerGuesses);
    }
  };

  const handleSubmitAttempt = async () => {
    try {
      const res = await fetch("/api/evaluate-attempt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user?.user_id,
          session_id: session?.session_id,
          attempt: session?.attempts,
          guess: players,
        }),
      });

      const newSession = await res.json();
      setSession(newSession);

      if (["WON", "LOST"].includes(newSession.sessionStatus)) {
        setShowSolution(true);

        const userRes = await fetch("/api/fetch-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user?.user_id }),
        });

        if (userRes.ok) {
          setUser(await userRes.json());
        }
      }

      if (
        newSession.sessionStatus === "ONGOING" &&
        newSession.previousAttemptCorrectGuesses !== null
      ) {
        toast.success(
          `You got ${newSession.previousAttemptCorrectGuesses} ${
            newSession.previousAttemptCorrectGuesses === 1 ? "guess" : "guesses"
          } correct!`
        );
      }
    } catch (err) {
      console.error("Failed to evaluate attempt:", err);
      toast.error("Something went wrong while submitting your guess.");
    }
  };

  return { handleResetAttempt, handleSubmitAttempt };
}
