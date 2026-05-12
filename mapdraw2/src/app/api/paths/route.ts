import { paths, trips, users } from "@/db/schema";
import db from "@/db/index";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

import { NextApiRequest, NextApiResponse } from "next";

export async function GET(request: NextApiRequest) {
  const { id } = request.query;
  const tripId: number = Number(id);

  if (isNaN(tripId)) {
    throw new Error("Invalid id: not a number");
  }

  try {
    const session: any = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const all = await db.select().from(paths).where(eq(trips.id, tripId));

    return new Response(JSON.stringify(all), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching paths:", error);
    return new Response(JSON.stringify({ error: "Failed to retrieve paths" }), {
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
    tripId: data.tripId,
    path: data.path,
  };

  await db.insert(paths).values(insert).returning();
}
