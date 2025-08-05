import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import crypto from "crypto";

interface UserInterface {
  user_id: string;
  games_played: number;
  games_won: number;
  current_streak: number;
  longest_streak: number;
  attempts_per_win_distribution: [number, number, number];
}

const mongoUri = process.env.MONGODB_URI!;
const mongoClient = new MongoClient(mongoUri);

export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  });
}

export async function POST(req: NextRequest) {
  try {
    await mongoClient.connect();
    const db = mongoClient.db(process.env.MONGODB_DATABASE!);
    const userCollection = db.collection(process.env.MONGODB_USER_COLLECTION!);

    const timestamp = Date.now().toString(16);
    const randomHex = crypto.randomBytes(4).toString("hex");
    const userId = `${timestamp}${randomHex}`;

    const newUser: UserInterface = {
      user_id: userId,
      games_played: 0,
      games_won: 0,
      current_streak: 0,
      longest_streak: 0,
      attempts_per_win_distribution: [0, 0, 0],
    };

    await userCollection.insertOne(newUser);

    return NextResponse.json(newUser, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    });
  } catch (e) {
    console.error("Error creating user:", e);
    return NextResponse.json({ error: "Failed to create user" }, {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    });
  } finally {
    await mongoClient.close();
  }
}
