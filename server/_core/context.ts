import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { getCurrentUser, type LocalUser } from "../localAuth";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: LocalUser | null;
};

export async function createContext(opts: CreateExpressContextOptions): Promise<TrpcContext> {
  return { req: opts.req, res: opts.res, user: await getCurrentUser(opts.req) };
}
