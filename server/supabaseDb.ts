import { getSupabaseAdmin } from "./supabase";

export type SupabaseProject = {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  tools: string[];
  thumbnailUrl: string | null;
  images: string[];
  demoUrl: string | null;
  githubUrl: string | null;
  isPublished: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

type ProjectRow = {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  category: string;
  tools: string[] | null;
  thumbnail_url: string | null;
  images: string[] | null;
  demo_url: string | null;
  github_url: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

function mapProject(row: ProjectRow): SupabaseProject {
  return {
    id: Number(row.id),
    slug: row.slug,
    title: row.title,
    shortDescription: row.short_description,
    description: row.description,
    category: row.category,
    tools: row.tools ?? [],
    thumbnailUrl: row.thumbnail_url,
    images: row.images ?? [],
    demoUrl: row.demo_url,
    githubUrl: row.github_url,
    isPublished: row.is_published,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const columns = "id,title,slug,short_description,description,category,tools,thumbnail_url,images,demo_url,github_url,is_published,sort_order,created_at,updated_at";

export async function listPublishedProjects() {
  const { data, error } = await getSupabaseAdmin().from("projects").select(columns).eq("is_published", true).order("sort_order", { ascending: true }).order("created_at", { ascending: false });
  if (error) throw error;
  return (data as ProjectRow[]).map(mapProject);
}

export async function getPublishedProjectBySlug(slug: string) {
  const { data, error } = await getSupabaseAdmin().from("projects").select(columns).eq("slug", slug).eq("is_published", true).maybeSingle();
  if (error) throw error;
  return data ? mapProject(data as ProjectRow) : undefined;
}

export async function listAllProjects() {
  const { data, error } = await getSupabaseAdmin().from("projects").select(columns).order("sort_order", { ascending: true }).order("created_at", { ascending: false });
  if (error) throw error;
  return (data as ProjectRow[]).map(mapProject);
}

type ProjectInput = Omit<SupabaseProject, "id" | "createdAt" | "updatedAt">;

function toRow(input: ProjectInput) {
  return {
    slug: input.slug,
    title: input.title,
    short_description: input.shortDescription,
    description: input.description,
    category: input.category,
    tools: input.tools,
    thumbnail_url: input.thumbnailUrl,
    images: input.images,
    demo_url: input.demoUrl,
    github_url: input.githubUrl,
    is_published: input.isPublished,
    sort_order: input.sortOrder,
  };
}

export async function createProject(input: ProjectInput) {
  const { data, error } = await getSupabaseAdmin().from("projects").insert(toRow(input)).select(columns).single();
  if (error) throw error;
  return mapProject(data as ProjectRow);
}

export async function updateProject(id: number, input: ProjectInput) {
  const { data, error } = await getSupabaseAdmin().from("projects").update(toRow(input)).eq("id", id).select(columns).maybeSingle();
  if (error) throw error;
  return data ? mapProject(data as ProjectRow) : undefined;
}

export async function deleteProject(id: number) {
  const { error } = await getSupabaseAdmin().from("projects").delete().eq("id", id);
  if (error) throw error;
  return { success: true } as const;
}
