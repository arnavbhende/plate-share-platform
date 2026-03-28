// =============================================================================
// POST /api/auth/login  — Authenticate user, return JWT cookie
// DELETE /api/auth/login — Logout (clear cookie)
// =============================================================================

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, signToken, AUTH_COOKIE } from "@/lib/auth";
import { loginSchema } from "@/lib/validations";
import { validationError, badRequest, serverError } from "@/lib/errors";

export async function POST(req: Request) {
  try {
    // 1. Validate the request body
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return validationError(parsed.error);
    }

    const { email, password } = parsed.data;

    // 2. Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Don't reveal whether the email exists — security best practice
      return badRequest("Invalid email or password");
    }

    // 3. Compare the provided password with the stored hash
    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return badRequest("Invalid email or password");
    }

    // 4. Create JWT and set cookie
    const token = signToken({ userId: user.id, role: user.role });

    const response = NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set(AUTH_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[LOGIN ERROR]", error);
    return serverError("Failed to log in");
  }
}

/**
 * DELETE /api/auth/login — Logout
 * Clears the authentication cookie.
 */
export async function DELETE() {
  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.set(AUTH_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0, // Immediately expires the cookie
    path: "/",
  });
  return response;
}
