// =============================================================================
// POST /api/donations/[id]/deliver — Mark a donation as delivered
// =============================================================================
// When the volunteer clicks "Mark as Delivered", this endpoint:
//   1. Updates donation status to DELIVERED
//   2. Notifies the donor that their food has been delivered
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

    if (user.role !== "VOLUNTEER") {
      return forbidden("Only volunteers can mark deliveries");
    }

    const { id } = await ctx.params;

    const donation = await prisma.donation.findUnique({ where: { id } });
    if (!donation) return notFound("Donation not found");

    // Only the assigned volunteer can mark it delivered
    if (donation.volunteerId !== user.userId) {
      return forbidden("You are not assigned to this donation");
    }

    if (donation.status !== "IN_TRANSIT" && donation.status !== "ACCEPTED") {
      return badRequest("Donation is not in a deliverable state");
    }

    const updated = await prisma.donation.update({
      where: { id },
      data: { status: "DELIVERED" },
    });

    // Notify the donor
    await prisma.notification.create({
      data: {
        userId: donation.donorId,
        type: "completed",
        title: "Delivery Completed",
        subtitle: `Your donation "${donation.title}" has been delivered successfully!`,
        icon: "🎉",
      },
    });

    return NextResponse.json({ donation: updated });
  } catch (error) {
    console.error("[DELIVER ERROR]", error);
    return serverError();
  }
}
