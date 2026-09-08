import fs from "node:fs";
import path from "node:path";

export type LocalProject = {
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

type Store = { nextId: number; projects: LocalProject[] };
const dataDir = path.resolve(process.env.DATABASE_DIR || "./data");
const dataFile = path.join(dataDir, process.env.DATABASE_FILE || "portfolio.json");
fs.mkdirSync(dataDir, { recursive: true });

function readStore(): Store {
  if (!fs.existsSync(dataFile)) return { nextId: 1, projects: [] };
  try { return JSON.parse(fs.readFileSync(dataFile, "utf8")) as Store; } catch { return { nextId: 1, projects: [] }; }
}
function writeStore(store: Store) { const temporary = `${dataFile}.tmp`; fs.writeFileSync(temporary, JSON.stringify(store, null, 2)); fs.renameSync(temporary, dataFile); }
function ordered(projects: LocalProject[]) { return [...projects].sort((a, b) => a.sortOrder - b.sortOrder || b.createdAt.localeCompare(a.createdAt)); }

export function listPublishedProjects() { return ordered(readStore().projects.filter(project => project.isPublished)); }
export function getPublishedProjectBySlug(slug: string) { const project = readStore().projects.find(item => item.slug === slug && item.isPublished); return project; }
export function listAllProjects() { return ordered(readStore().projects); }
export function createProject(input: Omit<LocalProject, "id" | "createdAt" | "updatedAt">) { const store = readStore(); const now = new Date().toISOString(); const project = { ...input, id: store.nextId++, createdAt: now, updatedAt: now }; store.projects.push(project); writeStore(store); return project; }
export function updateProject(id: number, input: Omit<LocalProject, "id" | "createdAt" | "updatedAt">) { const store = readStore(); const index = store.projects.findIndex(project => project.id === id); if (index === -1) return undefined; const previous = store.projects[index]; const project = { ...input, id, createdAt: previous.createdAt, updatedAt: new Date().toISOString() }; store.projects[index] = project; writeStore(store); return project; }
export function deleteProject(id: number) { const store = readStore(); store.projects = store.projects.filter(project => project.id !== id); writeStore(store); return { success: true } as const; }
