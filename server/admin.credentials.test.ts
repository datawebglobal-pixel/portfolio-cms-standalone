import "dotenv/config";
import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createLoginContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { setHeader: () => undefined } as unknown as TrpcContext["res"],
  };
}

describe("admin credentials", () => {
  it("authenticates the configured admin through the auth procedure", async () => {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    expect(email).toBeTruthy();
    expect(password).toBeTruthy();

    const caller = appRouter.createCaller(createLoginContext());
    const user = await caller.auth.login({ email: email!, password: password! });

    expect(user).toMatchObject({
      email: email!.toLowerCase(),
      role: "admin",
    });
  });
});
