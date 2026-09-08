import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(role: "admin" | "user"): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "portfolio-test-user",
      email: "test@example.com",
      name: "Portfolio Test User",
      loginMethod: "test",
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("portfolio admin access", () => {
  it("rejects authenticated non-admin users from the project manager", async () => {
    const caller = appRouter.createCaller(createContext("user"));
    await expect(caller.portfolio.adminList()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("allows the owner role through the admin gate", async () => {
    const caller = appRouter.createCaller(createContext("admin"));
    // With no seeded projects this resolves to an empty collection; the important
    // behavior here is that the role gate allows the request through.
    await expect(caller.portfolio.adminList()).resolves.toEqual([]);
  });
});
