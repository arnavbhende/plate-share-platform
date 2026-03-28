import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, category, servings, pickupTime, location } = body;

    const donation = await prisma.donation.create({
      data: {
        title,
        category,
        servings: Number(servings),
        pickupTime,
        location,
      },
    });

    return NextResponse.json(donation);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create donation" }, { status: 500 });
  }
}