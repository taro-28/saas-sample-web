/**
 * TODO(developer): Uncomment these variables before running the sample.
 */

// Example (Cloud Run): https://my-cloud-run-service.run.app/
const targetAudience = process.env.API_URL ?? "";

import { GoogleAuth } from "google-auth-library";

export async function request() {
  const serviceAccountJsonString = process.env.SERVICE_ACCOUNT_JSON;
  if (!serviceAccountJsonString) {
    throw new Error(
      "The $SERVICE_ACCOUNT_JSON environment variable was not found",
    );
  }
  const auth = new GoogleAuth({
    credentials: JSON.parse(serviceAccountJsonString),
  });
  const client = await auth.getIdTokenClient(targetAudience);

  // Alternatively, one can use `client.idTokenProvider.fetchIdToken`
  // to return the ID Token.
  const res = await client.request({
    url: `${targetAudience}/query`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: "query {todos {id}}" }),
  });
  console.info(res.data);
}

request().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
