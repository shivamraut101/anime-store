import fetch from "node-fetch";

const ACCOUNT_ID = "9331b4e3fd5f821894becf0cf45165bb";
const BUCKET_NAME = "slicemeow";
const TOKEN = "xq2WGOWDjKYDDkiFNFW2mgPvAW64Qczb24bZRHrm";

async function enablePublicAccess() {
  const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/r2/buckets/${BUCKET_NAME}`;
  
  try {
    console.log(`Enabling public access for bucket: ${BUCKET_NAME}`);
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // Note: The exact field name for r2.dev subdomain might vary or require a specific endpoint.
        // Usually, this is done in the dashboard because of the "allow" confirmation.
        // However, we'll try to set the dev domain if possible.
      })
    });

    const data = await response.json();
    console.log("Response:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

// Another attempt using the specific r2_dev_url endpoint if it exists
async function enableR2Dev() {
  const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/r2/buckets/${BUCKET_NAME}/domains/manage`;
  // This is a guess as the API for enabling r2.dev is not fully public/standard S3.
}

enablePublicAccess();
