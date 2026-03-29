import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createDonationSchema } from "@/lib/validations";
import { badRequest, validationError, serverError } from "@/lib/errors";

/**
 * GET /api/donations — List donations with optional filters
 * Query: ?status=PENDING,ACCEPTED  ?donorId=xxx  ?volunteerId=xxx
 */
export async function GET(req: Request) {
  try {
    const user = JSON.parse(req.headers.get("x-user") || "{}");
    if (!user?.id) {
      return badRequest("Missing user in x-user header");
    }

    const donations = await prisma.donation.findMany({
      where: { donorId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ donations });
  } catch (error) {
    console.error("[GET DONATIONS ERROR]", error);
    return serverError();
  }
}

/**
 * POST /api/donations — Create a new donation (DONOR role only)
 */
export async function POST(req: Request) {
  try {
    const user = JSON.parse(req.headers.get("x-user") || "{}");
    if (!user?.id) {
      return badRequest("Missing user in x-user header");
    }

    const body = await req.json();
    const parsed = createDonationSchema.safeParse(body);

    if (!parsed.success) {
      return validationError(parsed.error);
    }

    const { packaging, ...rest } = parsed.data;

    const donation = await prisma.donation.create({
      data: {
        ...rest,
        dietary: rest.dietary ?? "Veg",
        shelfLife: rest.shelfLife ?? "6h",
        pickupSlot: rest.pickupSlot ?? "Not specified",
        locationName: rest.locationName ?? rest.location,
        packaging: JSON.stringify(packaging),
        status: "PENDING_APPROVAL",
        donorId: user.id,
      },
    });

    return NextResponse.json({ donation }, { status: 201 });
  } catch (error) {
    console.error("[CREATE DONATION ERROR]", error);
    return serverError("Failed to create donation");
  }
}