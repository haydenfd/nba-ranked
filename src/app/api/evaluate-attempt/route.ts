import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { UserInterface } from "@/store/useUserStore";

const mongoUri = process.env.MONGODB_URI!;
const mongoClient = new MongoClient(mongoUri);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_id, session_id, attempt, guess } = body;

    if (!user_id || !session_id || typeof attempt !== "number" || !Array.isArray(guess)) {
      return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
    }

    await mongoClient.connect();
    const db = mongoClient.db(process.env.MONGODB_DATABASE!);
    const sessionCollection = db.collection(process.env.MONGODB_SESSIONS_COLLECTION!);
    const userCollection = db.collection(process.env.MONGODB_USER_COLLECTION!);

    const session = await sessionCollection.findOne({ session_id, user_id });

    if (!session || !session.solution) {
      return NextResponse.json({ error: "Session not found or has no solution" }, { status: 404 });
    }

    const newAttempts = Math.min((session.attempts ?? 0) + 1, 3);

    const evals = [];
    for (let i = 0; i < session.solution.length; i++) {
      evals.push(guess[i]?.id === session.solution[i]?.id ? 1 : 0);
    }

    const correct = evals.reduce((sum, val) => sum + val, 0);

    let sessionStatus = session.sessionStatus;
    if (correct === 5) {
      sessionStatus = "WON";
    } else if (newAttempts === 3) {
      sessionStatus = "LOST";
    } else {
      sessionStatus = "ONGOING";
    }

    const update = {
      attempts: newAttempts,
      sessionStatus,
      previousAttemptCorrectGuesses: correct,
      previousAttemptPlayerGuesses: guess,
      evals,
      solution: session.solution,
    };

    await sessionCollection.updateOne({ session_id, user_id }, { $set: update });

    if (sessionStatus === "WON" || sessionStatus === "LOST") {
      const user = await userCollection.findOne({ user_id });

      if (!user) {
        console.error("User not found while updating stats");
      } else {
        const updatedStats: Partial<UserInterface> = {
          games_played: (user.games_played ?? 0) + 1,
        };

        if (sessionStatus === "WON") {
          updatedStats.games_won = (user.games_won ?? 0) + 1;
          updatedStats.current_streak = (user.current_streak ?? 0) + 1;
          updatedStats.longest_streak = Math.max(
            user.longest_streak ?? 0,
            (user.current_streak ?? 0) + 1
          );

          const dist = user.attempts_per_win_distribution ?? [0, 0, 0];
          if (attempt >= 1 && attempt <= 3) {
            dist[attempt - 1] += 1;
          }
          updatedStats.attempts_per_win_distribution = dist;
        } else {
          updatedStats.current_streak = 0;
        }

        await userCollection.updateOne(
          { user_id },
          { $set: updatedStats }
        );
      }
    }

    const updatedSession = await sessionCollection.findOne({ session_id, user_id });
    return NextResponse.json(updatedSession, { status: 200 });

  } catch (err) {
    console.error("Error evaluating session:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  } finally {
    await mongoClient.close();
  }
}
