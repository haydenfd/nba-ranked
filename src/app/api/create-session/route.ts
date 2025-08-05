import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import crypto from "crypto";
import { SessionStoreInterface } from "@/store/useSessionStore";

const BBALL_REF_BASE = 'https://www.basketball-reference.com/req/202106291/images/headshots/'
const BBALL_REF_EXT = '.jpg'

const mongoUri = process.env.MONGODB_URI!;
const mongoClient = new MongoClient(mongoUri);

const metricOptions = ["pointsPerGame", "assistsPerGame", "reboundsPerGame"];

export async function POST(req: NextRequest) {
  try {
    const { user_id } = await req.json();

    if (!user_id) {
      return NextResponse.json(
        { error: "user_id is required" },
        { status: 400 }
      );
    }

    const session_id = crypto.randomBytes(8).toString("hex");
    const metric = metricOptions[Math.floor(Math.random() * metricOptions.length)];


    await mongoClient.connect();
    const db = mongoClient.db(process.env.MONGODB_DATABASE!);
    const players = db.collection(process.env.MONGODB_PLAYER_COLLECTION!);
    const sessions = db.collection(process.env.MONGODB_SESSIONS_COLLECTION!);

    const randomPlayers = await players.aggregate([
      { $sample: { size: 5 } }
    ]).toArray();

    const minimalPlayers = randomPlayers.map((player) => ({
    id: player.nbaPlayerId,
    name: player.name,
    img: BBALL_REF_BASE + player.code + BBALL_REF_EXT,
    statValue: player[metric]
  }));

  const tempSolution = [...minimalPlayers].sort(
  (a, b) => b.statValue - a.statValue
);

    const newSession: SessionStoreInterface = {
      session_id,
      user_id,
      metric,
      players: minimalPlayers,
      attempts: 0,
      sessionStatus: "ONGOING",
      previousAttemptCorrectGuesses: null,
      previousAttemptPlayerGuesses: null,
      solution: tempSolution,
    };
    // console.log(tempSolution);
    await sessions.insertOne(newSession);

    return NextResponse.json(newSession, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (e) {
    console.error("Error creating session:", e);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  } finally {
    await mongoClient.close();
  }
}
