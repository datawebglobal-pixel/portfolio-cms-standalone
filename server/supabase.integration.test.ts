import "dotenv/config";
import { describe, expect, it } from "vitest";
import { createProject, deleteProject } from "./supabaseDb";
import { getSupabaseAdmin, getSupabasePublic } from "./supabase";
import { PORTFOLIO_BUCKET, supabaseStoragePut, supabaseStorageRemove } from "./supabaseStorage";

describe("Supabase integration", () => {
  it("can read the portfolio table and list the image bucket with the server key", async () => {
    const client = getSupabaseAdmin();
    const [{ error: tableError }, { error: storageError }] = await Promise.all([
      client.from("projects").select("id").limit(1),
      client.storage.from(PORTFOLIO_BUCKET).list("projects", { limit: 1 }),
    ]);

    expect(tableError).toBeNull();
    expect(storageError).toBeNull();
  }, 20_000);

  it("can query published projects with the publishable key", async () => {
    const { error } = await getSupabasePublic().from("projects").select("id").eq("is_published", true).limit(1);
    expect(error).toBeNull();
  }, 20_000);

  it("can create and delete a project and upload/delete an image", async () => {
    const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const project = await createProject({
      slug: `integration-test-${suffix}`,
      title: "Integration test project",
      shortDescription: "Temporary project used for integration testing.",
      description: "This record is created and removed automatically by the Supabase integration test.",
      category: "Engineering",
      tools: ["Vitest"],
      thumbnailUrl: null,
      images: [],
      demoUrl: null,
      githubUrl: null,
      isPublished: false,
      sortOrder: 9999,
    });

    let uploadedKey: string | undefined;
    try {
      const uploaded = await supabaseStoragePut("integration-test.png", Buffer.from("not-a-real-image"), "image/png");
      uploadedKey = uploaded.key;
      expect(uploaded.url).toContain("/storage/v1/object/public/portfolio-images/");
      expect(project.title).toBe("Integration test project");
    } finally {
      if (uploadedKey) await supabaseStorageRemove([uploadedKey]);
      await deleteProject(project.id);
    }
  }, 30_000);
});
