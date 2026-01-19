import fetch from "node-fetch";

const ACCOUNT_ID = "9331b4e3fd5f821894becf0cf45165bb";
const BUCKET_NAME = "slicemeow";
const TOKEN = "xq2WGOWDjKYDDkiFNFW2mgPvAW64Qczb24bZRHrm";

async function enableR2Dev() {
  const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/r2/buckets/${BUCKET_NAME}/r2_dev_url`;
  
  try {
    console.log(`Enabling R2 dev URL for bucket: ${BUCKET_NAME}`);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    console.log("Response:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

enableR2Dev();
