// =============================================================================
// GET /api/auth/me — Return the currently logged-in user's profile
// =============================================================================
// This is how the frontend knows WHO is logged in. It reads the JWT cookie,
// decodes it, fetches the user from the database, and returns their info.
// =============================================================================

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";
import { unauthorized, serverError } from "@/lib/errors";

export async function GET() {
  try {
    // 1. Check if the user is logged in (has a valid JWT cookie)
    const tokenPayload = await getUserFromRequest();
    if (!tokenPayload) {
      return unauthorized();
    }

    // 2. Fetch the full user profile from the database
    const user = await prisma.user.findUnique({
      where: { id: tokenPayload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        address: true,
        avatar: true,
        vehicle: true,
        availability: true,
        preferences: true,
        isActive: true,
        createdAt: true,
        // Computed stats
        _count: {
          select: {
            donationsMade: true,
            deliveries: true,
          },
        },
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
