import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, forbidden, serverError } from "@/lib/errors";

export async function GET(req: Request) {
  try {
    const user = JSON.parse(req.headers.get("x-user") || "{}");

    if (!user?.id) {
      return badRequest("Missing user in x-user header");
    }
    if (user.role !== "NGO") {
      return forbidden("Only NGOs can view pending donations");
    }

    const donations = await prisma.donation.findMany({
      where: { status: "PENDING_APPROVAL" },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ donations });
  } catch (error) {
    console.error("[NGO PENDING ERROR]", error);
    return serverError("Failed to fetch pending donations");
  }
}
