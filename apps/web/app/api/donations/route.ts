import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";
import { createDonationSchema } from "@/lib/validations";
import { unauthorized, forbidden, validationError, serverError } from "@/lib/errors";

/**
 * GET /api/donations — List donations with optional filters
 * Query: ?status=PENDING,ACCEPTED  ?donorId=xxx  ?volunteerId=xxx
 */
export async function GET(req: Request) {
  try {
    const user = await getUserFromRequest();
    if (!user) return unauthorized();

    const { searchParams } = new URL(req.url);
    const where: Record<string, unknown> = {};

    const statusParam = searchParams.get("status");
    if (statusParam) {
      const statuses = statusParam.split(",");
      where.status = { in: statuses };
    }

    const donorId = searchParams.get("donorId");
    if (donorId) where.donorId = donorId;

    const volunteerId = searchParams.get("volunteerId");
    if (volunteerId) where.volunteerId = volunteerId;

    const donations = await prisma.donation.findMany({
      where,
      include: {
        donor: { select: { id: true, name: true, phone: true, address: true } },
        volunteer: { select: { id: true, name: true, phone: true } },
        ngo: { select: { id: true, name: true } },
      },
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
    const user = await getUserFromRequest();
    if (!user) return unauthorized();

    if (user.role !== "DONOR") {
      return forbidden("Only donors can create donations");
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
        packaging: JSON.stringify(packaging), // SQLite stores as JSON string
        donorId: user.userId,
      },
    });

    return NextResponse.json({ donation }, { status: 201 });
  } catch (error) {
    console.error("[CREATE DONATION ERROR]", error);
    return serverError("Failed to create donation");
  }
}