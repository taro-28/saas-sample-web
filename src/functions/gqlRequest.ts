import { GoogleAuth } from "google-auth-library";

const serviceAccountJsonString = process.env.SERVICE_ACCOUNT_JSON;

const apiUrl = process.env.API_URL ?? "";

type Props = { query: string };

export async function gqlRequest({ query }: Props) {
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
