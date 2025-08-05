import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGODB_URI!;
const mongoClient = new MongoClient(mongoUri);

export async function POST(req: NextRequest) {
  try {
    const { user_id, session_id } = await req.json();

    if (!user_id || !session_id) {
      return NextResponse.json(
        { error: "user_id and session_id are required" },
        { status: 400 }
      );
    }

    await mongoClient.connect();
    const db = mongoClient.db(process.env.MONGODB_DATABASE!);
    const sessions = db.collection(
      process.env.MONGODB_SESSIONS_COLLECTION!
    );

    const session = await sessions.findOne({ user_id, session_id });

    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(session, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (e) {
    console.error("Error fetching session:", e);
    return NextResponse.json(
      { error: "Failed to fetch session" },
      { status: 500 }
    );
  } finally {
    await mongoClient.close();
  }
}
