// =============================================================================
// GET /api/notifications — Get the logged-in user's notifications
// =============================================================================

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";
import { unauthorized, serverError } from "@/lib/errors";

export async function GET() {
  try {
    const user = await getUserFromRequest();
    if (!user) return unauthorized();

    const notifications = await prisma.notification.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: "desc" },
      take: 50, // Return at most 50 recent notifications
    });

    return NextResponse.json({ notifications });
  } catch (error) {
    console.error("[NOTIFICATIONS ERROR]", error);
    return serverError();
  }
}
