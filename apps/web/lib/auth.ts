// =============================================================================
// AUTH UTILITIES — JWT signing/verification + password hashing
// =============================================================================
// This file is the backbone of authentication. It provides:
//   1. hashPassword()  — takes a plain password, returns a bcrypt hash
//   2. verifyPassword() — compares plain password against stored hash
//   3. signToken()     — creates a JWT token containing the user's id & role
//   4. verifyToken()   — decodes a JWT and returns the payload
//   5. getUserFromRequest() — reads the JWT cookie from an incoming request
// =============================================================================

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// The secret key used to sign JWTs. In production, this MUST be a long random
// string stored in your .env file. Never hardcode it.
const JWT_SECRET = process.env.JWT_SECRET || "plateshare-dev-secret-change-me";

// How long the JWT token lasts before expiring
const TOKEN_EXPIRY = "7d"; // 7 days

// Cookie name used to store the JWT
export const AUTH_COOKIE = "plateshare_token";

// ─── Types ───────────────────────────────────────────────────────────────────

export type TokenPayload = {
  userId: string;
  role: string;
};

// ─── Password Utilities ─────────────────────────────────────────────────────

/**
 * Hash a plain-text password using bcrypt.
 * The "10" is the salt rounds — higher = more secure but slower.
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * Compare a plain-text password with a bcrypt hash.
 * Returns true if they match.
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ─── JWT Utilities ──────────────────────────────────────────────────────────

/**
 * Create a signed JWT token containing the user's ID and role.
 * This token is what proves "this person is logged in" on every request.
 */
export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

/**
 * Verify and decode a JWT token. Returns null if invalid/expired.
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

// ─── Request Helpers ────────────────────────────────────────────────────────

/**
 * Extract the current user's identity from the request cookies.
 * Returns the decoded token payload, or null if not logged in.
 *
 * Usage in any API route:
 *   const user = await getUserFromRequest();
 *   if (!user) return unauthorized();
 */
export async function getUserFromRequest(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  if (!token) return null;
  return verifyToken(token);
}
