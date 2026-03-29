import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, forbidden, notFound, serverError } from "@/lib/errors";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(req: Request, ctx: RouteContext) {
  try {
    const user = JSON.parse(req.headers.get("x-user") || "{}");

    if (!user?.id) {
      return badRequest("Missing user in x-user header");
    }
    if (user.role !== "NGO") {
      return forbidden("Only NGOs can reject donations");
    }

    const { id } = await ctx.params;

    const donation = await prisma.donation.findUnique({ where: { id } });
    if (!donation) {
      return notFound("Donation not found");
    }
    if (donation.status !== "PENDING_APPROVAL") {
      return badRequest("Only pending donations can be rejected");
    }

    const updated = await prisma.donation.update({
      where: { id },
      data: { status: "REJECTED" },
    });

    return NextResponse.json({ donation: updated });
  } catch (error) {
    console.error("[NGO REJECT ERROR]", error);
    return serverError("Failed to reject donation");
  }
}
