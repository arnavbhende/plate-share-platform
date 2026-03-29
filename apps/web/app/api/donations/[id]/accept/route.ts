// =============================================================================
// POST /api/donations/[id]/accept — Volunteer accepts a pickup task
// =============================================================================
// When a volunteer clicks "Accept Task" on the available pickups page,
// this endpoint assigns them to the donation and changes status to ACCEPTED.
// =============================================================================

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, notFound, serverError } from "@/lib/errors";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(req: Request, ctx: RouteContext) {
  try {
    const user = JSON.parse(req.headers.get("x-user") || "{}");
    if (!user?.id) {
      return badRequest("Missing user in x-user header");
    }

    const { id } = await ctx.params;

    const donation = await prisma.donation.findUnique({ where: { id } });
    if (!donation) {
      return notFound("Donation not found");
    }

    if (donation.status !== "APPROVED") {
      return badRequest("Only APPROVED donations can be accepted");
    }

    const updatedResult = await prisma.donation.updateMany({
      where: { id, status: "APPROVED" },
      data: {
        volunteerId: user.id,
        status: "ACCEPTED",
      },
    });

    if (updatedResult.count === 0) {
      return badRequest("This donation has already been accepted");
    }

    const updated = await prisma.donation.findUnique({ where: { id } });

    return NextResponse.json({ donation: updated });
  } catch (error) {
    console.error("[ACCEPT PICKUP ERROR]", error);
    return serverError();
  }
}
