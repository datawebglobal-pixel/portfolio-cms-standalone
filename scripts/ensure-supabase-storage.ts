import "dotenv/config";
import { getSupabaseAdmin } from "../server/supabase";
import { PORTFOLIO_BUCKET } from "../server/supabaseStorage";

const client = getSupabaseAdmin();
const { data: buckets, error: listError } = await client.storage.listBuckets();
if (listError) throw listError;
const existing = buckets?.find(bucket => bucket.name === PORTFOLIO_BUCKET);
if (existing) {
  console.log(`Bucket ${PORTFOLIO_BUCKET} exists; public=${existing.public}`);
} else {
  const { data, error } = await client.storage.createBucket(PORTFOLIO_BUCKET, { public: true, fileSizeLimit: "8MB", allowedMimeTypes: ["image/*"] });
  if (error) throw error;
  console.log(`Created bucket ${data?.name ?? PORTFOLIO_BUCKET}`);
}
