// =============================================================================
// POST /api/donations/[id]/accept — Volunteer accepts a pickup task
// =============================================================================
// When a volunteer clicks "Accept Task" on the available pickups page,
// this endpoint assigns them to the donation and changes status to ACCEPTED.
// =============================================================================

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";
import { unauthorized, forbidden, notFound, badRequest, serverError } from "@/lib/errors";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(_req: Request, ctx: RouteContext) {
  try {
    const user = await getUserFromRequest();
    if (!user) return unauthorized();

    // Only volunteers can accept pickups
    if (user.role !== "VOLUNTEER") {
      return forbidden("Only volunteers can accept pickups");
    }

    const { id } = await ctx.params;

    // Check that the donation exists and is available
    const donation = await prisma.donation.findUnique({ where: { id } });
    if (!donation) {
      return notFound("Donation not found");
    }

    if (donation.status !== "PENDING") {
      return badRequest("This donation has already been claimed");
    }

    // Assign the volunteer and update status
    const updated = await prisma.donation.update({
      where: { id },
      data: {
        volunteerId: user.userId,
        status: "ACCEPTED",
      },
    });

    // Create a notification for the donor
    await prisma.notification.create({
      data: {
        userId: donation.donorId,
        type: "assigned",
        title: "Volunteer Assigned",
        subtitle: `A volunteer has accepted your donation "${donation.title}"`,
        icon: "✅",
      },
    });

    return NextResponse.json({ donation: updated });
  } catch (error) {
    console.error("[ACCEPT PICKUP ERROR]", error);
    return serverError();
  }
}
