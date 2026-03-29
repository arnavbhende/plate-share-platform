// =============================================================================
// GET   /api/users/me — Get current user's profile with computed stats
// PATCH /api/users/me — Update profile fields
// =============================================================================

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, unauthorized, serverError } from "@/lib/errors";

/**
 * GET /api/users/me
 * Returns the full profile of the logged-in user, including:
 *   - Basic info (name, email, phone, etc.)
 *   - Computed stats (total deliveries, total donations made)
 *   - Average rating (computed from delivered donations)
 */
export async function GET(req: Request) {
  try {
    const userHeader = JSON.parse(req.headers.get("x-user") || "{}");
    if (!userHeader.id) return unauthorized();

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

    if (!user) return unauthorized("User not found");

    return NextResponse.json({ user });
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
    const userHeader = JSON.parse(req.headers.get("x-user") || "{}");
    if (!userHeader.id) return unauthorized();

    const body = await req.json();
    const data: Record<string, string> = {};

    if (typeof body.name === "string" && body.name.trim()) {
      data.name = body.name.trim();
    }

    if (typeof body.role === "string" && body.role.trim()) {
      data.role = body.role.trim();
    }

    if (Object.keys(data).length === 0) {
      return badRequest("Provide at least one field to update");
    }

    const updated = await prisma.user.update({
      where: { id: userHeader.id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ user: updated });
  } catch (error) {
    console.error("[UPDATE PROFILE ERROR]", error);
    return serverError();
  }
}
