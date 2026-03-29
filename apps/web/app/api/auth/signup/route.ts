import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    console.log("DATABASE_URL loaded:", process.env.DATABASE_URL);

    // Prisma connectivity probe for debugging initialization/connection issues.
    const userCount = await prisma.user.count();
    console.log("Current user count:", userCount);

    const body = await req.json();
    console.log("Signup request body:", body);

    const { name, email, password, role } = body ?? {};

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      const message = firstIssue
        ? `${firstIssue.path.join(".")}: ${firstIssue.message}`
        : "Invalid request data";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const payload = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        role: payload.role,
      },
    });

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientInitializationError) {
      console.error("🔥 SIGNUP ERROR: Prisma initialization failed", error);
      return NextResponse.json(
        {
          success: false,
          error: String(error),
        },
        { status: 500 }
      );
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 400 }
      );
    }

    console.error("🔥 SIGNUP ERROR:", error);
    console.error("FULL ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}
