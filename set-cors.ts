import "dotenv/config";
import { S3Client, PutBucketCorsCommand } from "@aws-sdk/client-s3";

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

async function setCors() {
  try {
    console.log(`Setting CORS for bucket: ${R2_BUCKET_NAME}`);
    await s3Client.send(
      new PutBucketCorsCommand({
        Bucket: R2_BUCKET_NAME,
        CORSConfiguration: {
          CORSRules: [
            {
              AllowedHeaders: ["*"],
              AllowedMethods: ["GET", "HEAD"],
              AllowedOrigins: ["*"], // In production, replace with your actual domain
              ExposeHeaders: [],
              MaxAgeSeconds: 3000,
            },
          ],
        },
      })
    );
    console.log("CORS set successfully");
  } catch (error) {
    console.error("Error setting CORS:", error);
  }
}

setCors();
