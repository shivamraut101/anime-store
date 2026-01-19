import "dotenv/config";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_ENDPOINT = process.env.R2_ENDPOINT;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

const s3Client = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID || "",
    secretAccessKey: R2_SECRET_ACCESS_KEY || "",
  },
});

async function listFiles() {
  try {
    console.log(`Listing files in bucket: ${R2_BUCKET_NAME}`);
    const data = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: R2_BUCKET_NAME,
        Prefix: "comingsoon/",
      })
    );
    console.log("Files found:", JSON.stringify(data.Contents, null, 2));
  } catch (error) {
    console.error("Error listing files:", error);
  }
}

listFiles();
