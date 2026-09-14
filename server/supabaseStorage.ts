import path from "node:path";
import { nanoid } from "nanoid";
import { getSupabaseAdmin } from "./supabase";

export const PORTFOLIO_BUCKET = "portfolio-images";

export async function supabaseStoragePut(filename: string, data: Buffer, contentType: string) {
  const extension = path.extname(filename).toLowerCase().replace(/[^a-z0-9.]/g, "") || ".bin";
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-80);
  const key = `projects/${Date.now()}-${nanoid(10)}-${safeName || `image${extension}`}`;
  const { error } = await getSupabaseAdmin().storage.from(PORTFOLIO_BUCKET).upload(key, data, {
    contentType,
    upsert: false,
    cacheControl: "31536000",
  });
  if (error) throw error;
  const { data: publicData } = getSupabaseAdmin().storage.from(PORTFOLIO_BUCKET).getPublicUrl(key);
  return { key, url: publicData.publicUrl, contentType };
}

export async function supabaseStorageRemove(keys: string[]) {
  if (!keys.length) return;
  const { error } = await getSupabaseAdmin().storage.from(PORTFOLIO_BUCKET).remove(keys);
  if (error) throw error;
}
