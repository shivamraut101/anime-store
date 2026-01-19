import "dotenv/config";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fetch from "node-fetch";

const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_ENDPOINT = process.env.R2_ENDPOINT;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN;

const s3Client = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID || "",
    secretAccessKey: R2_SECRET_ACCESS_KEY || "",
  },
});

async function uploadToR2(url: string, key: string) {
  try {
    console.log(`Downloading: ${url}`);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    const buffer = await response.buffer();
    const contentType = response.headers.get("content-type") || "application/octet-stream";

    console.log(`Uploading to R2: ${key}`);
    await s3Client.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      })
    );

    const newUrl = `${R2_PUBLIC_DOMAIN}/${key}`;
    console.log(`Successfully migrated to: ${newUrl}`);
    return newUrl;
  } catch (error) {
    console.error(`Error migrating ${url}:`, error);
    return null;
  }
}

async function run() {
  const assets = [
    { name: "web-banner.mp4", url: "https://files.edgestore.dev/ylanf3daiol6idma/comingsoon/_public/web%20banner.mp4" },
    { name: "mobile-(1).mp4", url: "https://files.edgestore.dev/ylanf3daiol6idma/comingsoon/_public/mobile%20(1).mp4" },
    { name: "animation.json", url: "https://files.edgestore.dev/ylanf3daiol6idma/comingsoon/_public/animation.json" },
    { name: "mobile.json", url: "https://files.edgestore.dev/ylanf3daiol6idma/comingsoon/_public/mobile.json" },
  ];

  for (const asset of assets) {
    const key = `comingsoon/${asset.name}`;
    await uploadToR2(asset.url, key);
  }
}

run();
