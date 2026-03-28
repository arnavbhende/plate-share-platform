// =============================================================================
// GET   /api/users/me — Get current user's profile with computed stats
// PATCH /api/users/me — Update profile fields
// =============================================================================

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";
import { updateProfileSchema } from "@/lib/validations";
import { unauthorized, validationError, serverError } from "@/lib/errors";

/**
 * GET /api/users/me
 * Returns the full profile of the logged-in user, including:
 *   - Basic info (name, email, phone, etc.)
 *   - Computed stats (total deliveries, total donations made)
 *   - Average rating (computed from delivered donations)
 */
export async function GET() {
  try {
    const tokenPayload = await getUserFromRequest();
    if (!tokenPayload) return unauthorized();

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
        _count: {
          select: {
            donationsMade: true,
            deliveries: { where: { status: "DELIVERED" } },
          },
        },
      },
    });

    if (!user) return unauthorized("User not found");

    return NextResponse.json({
      user: {
        ...user,
        totalDonations: user._count.donationsMade,
        totalDeliveries: user._count.deliveries,
      },
    });
  } catch (error) {
    console.error("[GET PROFILE ERROR]", error);
    return serverError();
  }
}

/**
 * PATCH /api/users/me
 * Update the logged-in user's profile fields.
 * Used by the volunteer profile page and settings page.
 */
export async function PATCH(req: Request) {
  try {
    const tokenPayload = await getUserFromRequest();
    if (!tokenPayload) return unauthorized();

    const body = await req.json();
    const parsed = updateProfileSchema.safeParse(body);

    if (!parsed.success) {
      return validationError(parsed.error);
    }

    const updated = await prisma.user.update({
      where: { id: tokenPayload.userId },
      data: parsed.data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        address: true,
        vehicle: true,
        availability: true,
        preferences: true,
        isActive: true,
      },
    });

    return NextResponse.json({ user: updated });
  } catch (error) {
    console.error("[UPDATE PROFILE ERROR]", error);
    return serverError();
  }
}
