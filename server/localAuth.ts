import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import type { Request, Response } from "express";

export type LocalUser = { id: number; name: string; email: string; role: "admin" };
const COOKIE_NAME = "portfolio_session";
const secret = new TextEncoder().encode(process.env.SESSION_SECRET || process.env.JWT_SECRET || "change-this-session-secret");
const adminEmail = (process.env.ADMIN_EMAIL || "admin@example.com").trim().toLowerCase();
const adminPassword = process.env.ADMIN_PASSWORD || "change-this-password";
const adminName = process.env.ADMIN_NAME || "Portfolio Owner";
const cookieOptions = `Path=/; HttpOnly; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`;
function adminUser(): LocalUser { return { id: 1, name: adminName, email: adminEmail, role: "admin" }; }
export async function verifyAdminCredentials(email: string, password: string) {
  if (email.trim().toLowerCase() !== adminEmail) return false;
  return process.env.ADMIN_PASSWORD_HASH ? bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH) : password === adminPassword;
}
export async function createSession(res: Response) {
  const token = await new SignJWT({ email: adminEmail, role: "admin", name: adminName }).setProtectedHeader({ alg: "HS256" }).setSubject("1").setIssuedAt().setExpirationTime("30d").sign(secret);
  res.setHeader("Set-Cookie", `${COOKIE_NAME}=${token}; Max-Age=2592000; ${cookieOptions}`);
}
export function clearSession(res: Response) { res.setHeader("Set-Cookie", `${COOKIE_NAME}=; Max-Age=0; ${cookieOptions}`); }
export async function getCurrentUser(req: Request): Promise<LocalUser | null> {
  const token = req.headers.cookie?.split(";").map(cookie => cookie.trim()).find(cookie => cookie.startsWith(`${COOKIE_NAME}=`))?.slice(COOKIE_NAME.length + 1);
  if (!token) return null;
  try { const { payload } = await jwtVerify(token, secret); return payload.role === "admin" && payload.sub === "1" ? adminUser() : null; } catch { return null; }
}
export { COOKIE_NAME };
