import { useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { PlayerInterface, useSessionStore } from '@/store/useSessionStore';

export function useInitUserAndSession(
  setPlayers: (players: PlayerInterface[]) => void,
  setShowSolution: (b: boolean) => void
) {
  const setUser = useUserStore((s) => s.setUser);
  const setSession = useSessionStore((s) => s.setSession);

  useEffect(() => {
    const init = async () => {
      try {
        let user;
        const uid = localStorage.getItem("user_id");
        if (!uid) {
          const res = await fetch("/api/create-user", { method: "POST" });
          user = await res.json();
          localStorage.setItem("user_id", user.user_id);
        } else {
          const res = await fetch("/api/fetch-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: uid }),
          });
          user = await res.json();
        }

        setUser(user);

        let session;
        const sid = localStorage.getItem("session_id");

        if (sid) {
          const res = await fetch("/api/fetch-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: user.user_id, session_id: sid }),
          });
          session = await res.json();

          if (["WON", "LOST"].includes(session.sessionStatus)) {
            session = null; // force session creation below
          }
        }

        if (!session) {
          const res = await fetch("/api/create-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: user.user_id }),
          });
          session = await res.json();
          localStorage.setItem("session_id", session.session_id);
        }

        setSession(session);
        setPlayers(session.players);
        if (["WON", "LOST"].includes(session.sessionStatus)) {
          setShowSolution(true);
        }
      } catch (err) {
        console.error("Init failed", err);
      }
    };

    init();
  }, []);
}
