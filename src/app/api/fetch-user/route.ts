import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

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
    const body = await req.json();
    const { user_id } = body;

    if (!user_id) {
      return NextResponse.json({ error: "user_id is required" }, {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
        }
      });
    }

    await mongoClient.connect();
    const db = mongoClient.db(process.env.MONGODB_DATABASE!);
    const userCollection = db.collection<UserInterface>(process.env.MONGODB_USER_COLLECTION!);

    const user = await userCollection.findOne({ user_id });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
        }
      });
    }

    return NextResponse.json(user, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    });

  } catch (err) {
    console.error("Error fetching user:", err);
    return NextResponse.json({ error: "Failed to fetch user" }, {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    });
  } finally {
    await mongoClient.close();
  }
}
