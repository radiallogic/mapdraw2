import { trips, users } from "@/db/schema";
import db from "@/db/index";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

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

export async function POST(request: Request) {
  const body = await request.json();

  const session: any = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  // insert or update
  const insert = {
    name: body.name,
    userId: session.user.id,
    location: body.location ?? {
      location: {
        x: -3.0176,
        y: 51.8203,
      },
    },
    zoom: body.zoom ?? 5,
  };

  await db
    .insert(trips)
    .values(insert)
    .onConflictDoUpdate({
      target: body.id,
      set: insert,
    })
    .returning();
}
