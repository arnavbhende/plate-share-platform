// =============================================================================
// POST /api/auth/signup — Register a new user
// =============================================================================

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, signToken, AUTH_COOKIE } from "@/lib/auth";
import { signupSchema } from "@/lib/validations";
import { validationError, badRequest, serverError } from "@/lib/errors";

export async function POST(req: Request) {
  try {
    // 1. Parse and validate the request body
    const body = await req.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return validationError(parsed.error);
    }

    const { name, email, password, role } = parsed.data;

    // 2. Check if a user with this email already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return badRequest("An account with this email already exists");
    }

    // 3. Hash the password (never store plain passwords!)
    const passwordHash = await hashPassword(password);

    // 4. Create the user in the database
    const user = await prisma.user.create({
      data: { name, email, passwordHash, role },
    });

    // 5. Create a JWT token so the user is immediately logged in
    const token = signToken({ userId: user.id, role: user.role });

    // 6. Set the token as an HttpOnly cookie (secure, can't be read by JavaScript)
    const response = NextResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );

    response.cookies.set(AUTH_COOKIE, token, {
      httpOnly: true,        // JavaScript can't read this cookie
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[SIGNUP ERROR]", error);
    return serverError("Failed to create account");
  }
}
