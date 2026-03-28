// =============================================================================
// GET   /api/donations/[id] — Get a single donation with full details
// PATCH /api/donations/[id] — Update donation status
// =============================================================================

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";
import { updateDonationStatusSchema } from "@/lib/validations";
import { unauthorized, notFound, validationError, serverError } from "@/lib/errors";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * GET /api/donations/[id]
 * Returns a single donation with donor, volunteer, and NGO details.
 */
export async function GET(_req: Request, ctx: RouteContext) {
  try {
    const user = await getUserFromRequest();
    if (!user) return unauthorized();

    const { id } = await ctx.params;

    const donation = await prisma.donation.findUnique({
      where: { id },
      include: {
        donor: {
          select: { id: true, name: true, phone: true, address: true },
        },
        volunteer: {
          select: { id: true, name: true, phone: true },
        },
        ngo: {
          select: { id: true, name: true },
        },
      },
    });

    if (!donation) {
      return notFound("Donation not found");
    }

    return NextResponse.json({ donation });
  } catch (error) {
    console.error("[GET DONATION ERROR]", error);
    return serverError();
  }
}

/**
 * PATCH /api/donations/[id]
 * Update the status of a donation (e.g., PENDING → IN_TRANSIT).
 */
export async function PATCH(req: Request, ctx: RouteContext) {
  try {
    const user = await getUserFromRequest();
    if (!user) return unauthorized();

    const { id } = await ctx.params;
    const body = await req.json();
    const parsed = updateDonationStatusSchema.safeParse(body);

    if (!parsed.success) {
      return validationError(parsed.error);
    }

    // Make sure the donation exists
    const existing = await prisma.donation.findUnique({ where: { id } });
    if (!existing) {
      return notFound("Donation not found");
    }

    const donation = await prisma.donation.update({
      where: { id },
      data: { status: parsed.data.status },
    });

    return NextResponse.json({ donation });
  } catch (error) {
    console.error("[UPDATE DONATION ERROR]", error);
    return serverError();
  }
}
