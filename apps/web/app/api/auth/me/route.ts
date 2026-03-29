// =============================================================================
// GET /api/auth/me — Return the currently logged-in user's profile
// =============================================================================
// This is how the frontend knows WHO is logged in. It reads the JWT cookie,
// decodes it, fetches the user from the database, and returns their info.
// =============================================================================

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { unauthorized, serverError } from "@/lib/errors";

export async function GET(req: Request) {
  try {
    const userHeader = JSON.parse(req.headers.get("x-user") || "{}");
    if (!userHeader.id) {
      return unauthorized();
    }

    const user = await prisma.user.findUnique({
      where: { id: userHeader.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return unauthorized("User not found");
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("[AUTH/ME ERROR]", error);
    return serverError();
  }
}
