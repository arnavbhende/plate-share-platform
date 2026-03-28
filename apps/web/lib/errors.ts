// =============================================================================
// ERROR HELPERS — Standardized JSON error responses
// =============================================================================
// Instead of writing `return NextResponse.json({ error: "..." }, { status: 401 })`
// everywhere, we use these helpers for consistency.
// =============================================================================

import { NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * 400 Bad Request — validation failed or missing required fields
 */
export function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

/**
 * 401 Unauthorized — user is not logged in
 */
export function unauthorized(message = "You must be logged in") {
  return NextResponse.json({ error: message }, { status: 401 });
}

/**
 * 403 Forbidden — user doesn't have the right role
 */
export function forbidden(message = "You don't have permission") {
  return NextResponse.json({ error: message }, { status: 403 });
}

/**
 * 404 Not Found
 */
export function notFound(message = "Resource not found") {
  return NextResponse.json({ error: message }, { status: 404 });
}

/**
 * 500 Internal Server Error — something unexpected went wrong
 */
export function serverError(message = "Something went wrong") {
  return NextResponse.json({ error: message }, { status: 500 });
}

/**
 * Convert a Zod validation error into a clean 400 response.
 * Pulls out the first error message to show the user.
 */
export function validationError(error: ZodError) {
  const firstIssue = error.issues[0];
  const message = firstIssue
    ? `${firstIssue.path.join(".")}: ${firstIssue.message}`
    : "Invalid request data";
  return badRequest(message);
}
