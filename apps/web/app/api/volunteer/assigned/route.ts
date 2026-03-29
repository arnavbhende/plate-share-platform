import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, serverError } from "@/lib/errors";

export async function GET(req: Request) {
  try {
    const user = JSON.parse(req.headers.get("x-user") || "{}");

    if (!user?.id) {
      return badRequest("Missing user in x-user header");
    }

    const pickups = await prisma.donation.findMany({
      where: { volunteerId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ pickups });
  } catch (error) {
    console.error("[VOLUNTEER ASSIGNED ERROR]", error);
    return serverError("Failed to fetch assigned pickups");
  }
}
