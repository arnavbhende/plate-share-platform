import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations";
import { validationError, badRequest, serverError } from "@/lib/errors";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return validationError(parsed.error);
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return badRequest("Invalid email or password");
    }

    const isValid = password === user.password;
    if (!isValid) {
      return badRequest("Invalid email or password");
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
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
  return NextResponse.json({ success: true, message: "Logged out" });
}
