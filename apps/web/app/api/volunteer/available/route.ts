import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, forbidden, serverError } from "@/lib/errors";

export async function GET(req: Request) {
  try {
    const user = JSON.parse(req.headers.get("x-user") || "{}");
    if (!user?.id) {
      return badRequest("Missing user in x-user header");
    }
    if (user.role !== "VOLUNTEER") {
      return forbidden("Only volunteers can view available pickups");
    }

    const pickups = await prisma.donation.findMany({
      where: { status: "APPROVED" },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ pickups });
  } catch (error) {
    console.error("[VOLUNTEER AVAILABLE ERROR]", error);
    return serverError("Failed to fetch available pickups");
  }
}
