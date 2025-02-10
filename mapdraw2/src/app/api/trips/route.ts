import { trips, users } from "@/db/schema";
import db from "@/db/index";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { NextApiRequest } from "next";

export async function GET(request: Request) {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    const all = await db
      .select()
      .from(trips)
      .where(eq(users.id, session.user.id));

    return new Response(JSON.stringify(all), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching clubs:", error);
    return new Response(JSON.stringify({ error: "Failed to retrieve trips" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request: NextApiRequest) {
  const { data } = request.body;

  const session: any = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  //TODO Sanitise input?

  const insert = {
    name: data.string,
    userId: session.user.id,
    location: data.location,
    zoom: data.zoom,
  };

  await db.insert(trips).values(insert).returning();
}
