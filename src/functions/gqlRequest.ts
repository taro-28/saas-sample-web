import { GoogleAuth } from "google-auth-library";

const serviceAccountJsonString = process.env.SERVICE_ACCOUNT_JSON;

export const apiUrl = process.env.API_URL ?? "";

export async function gqlRequest(query: string) {
  if (!serviceAccountJsonString) {
    throw new Error(
      "The $SERVICE_ACCOUNT_JSON environment variable was not found",
    );
  }
  const auth = new GoogleAuth({
    credentials: JSON.parse(serviceAccountJsonString),
  });
  const client = await auth.getIdTokenClient(apiUrl);

  const res = await client
    .request({
      url: `${apiUrl}/query`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })
    .catch((err) => {
      console.error(err.message);
      process.exitCode = 1;

      throw err;
    });

  return res.data;
}
