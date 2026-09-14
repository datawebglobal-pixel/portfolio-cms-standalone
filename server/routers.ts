import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { nanoid } from "nanoid";
import { clearSession, createSession, verifyAdminCredentials } from "./localAuth";
import { createProject, deleteProject, getPublishedProjectBySlug, listAllProjects, listPublishedProjects, updateProject } from "./supabaseDb";
import { supabaseStoragePut } from "./supabaseStorage";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";

const projectInput = z.object({
  title: z.string().min(2).max(180),
  shortDescription: z.string().min(10),
  description: z.string().min(10),
  category: z.string().min(2).max(100),
  tools: z.array(z.string().min(1)).min(1),
  thumbnailUrl: z.string().optional().nullable(),
  images: z.array(z.string()).default([]),
  demoUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  isPublished: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
});

const adminOnly = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  return next({ ctx });
});

export const appRouter = router({
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    login: publicProcedure.input(z.object({ email: z.string().email(), password: z.string().min(1) })).mutation(async ({ input, ctx }) => {
      if (!(await verifyAdminCredentials(input.email, input.password))) throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password" });
      return createSession(ctx.res);
    }),
    logout: publicProcedure.mutation(({ ctx }) => { clearSession(ctx.res); return { success: true } as const; }),
  }),
  portfolio: router({
    published: publicProcedure.query(() => listPublishedProjects()),
    bySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ input }) => {
      const project = await getPublishedProjectBySlug(input.slug);
      if (!project) throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" });
      return project;
    }),
    adminList: adminOnly.query(() => listAllProjects()),
    uploadImage: adminOnly.input(z.object({ filename: z.string(), contentType: z.string(), dataUrl: z.string().min(20) })).mutation(async ({ input }) => {
      if (!input.contentType.startsWith("image/")) throw new TRPCError({ code: "BAD_REQUEST", message: "Only image files are supported" });
      const base64 = input.dataUrl.split(",")[1] ?? input.dataUrl;
      const buffer = Buffer.from(base64, "base64");
      if (buffer.byteLength > 8 * 1024 * 1024) throw new TRPCError({ code: "PAYLOAD_TOO_LARGE", message: "Images must be under 8MB" });
      return supabaseStoragePut(`${nanoid(6)}-${input.filename}`, buffer, input.contentType);
    }),
    create: adminOnly.input(projectInput).mutation(({ input }) => createProject({ ...input, slug: `${input.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 130)}-${nanoid(6)}`, thumbnailUrl: input.thumbnailUrl || null, demoUrl: input.demoUrl || null, githubUrl: input.githubUrl || null })),
    update: adminOnly.input(projectInput.extend({ id: z.number().int() })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      const existing = (await listAllProjects()).find(project => project.id === id);
      if (!existing) throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" });
      return updateProject(id, { ...data, slug: existing.slug, thumbnailUrl: data.thumbnailUrl || null, demoUrl: data.demoUrl || null, githubUrl: data.githubUrl || null });
    }),
    remove: adminOnly.input(z.object({ id: z.number().int() })).mutation(({ input }) => deleteProject(input.id)),
  }),
});

export type AppRouter = typeof appRouter;
