import fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const uploadDir = path.resolve(process.env.UPLOAD_DIR || "./uploads");

export async function localStoragePut(filename: string, data: Buffer, contentType: string) {
  await fs.mkdir(uploadDir, { recursive: true });
  const extension = path.extname(filename).toLowerCase().replace(/[^a-z0-9.]/g, "") || ".bin";
  const key = `${Date.now()}-${nanoid(10)}${extension}`;
  await fs.writeFile(path.join(uploadDir, key), data);
  return { key, url: `/uploads/${key}`, contentType };
}

export { uploadDir };
