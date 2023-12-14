import { getSdk } from "@/gql/generated";
import { GoogleAuth } from "google-auth-library";
import { GraphQLClient } from "graphql-request";
import { cache } from "react";

const serviceAccountJsonString = process.env.SERVICE_ACCOUNT_JSON;

const apiUrl = process.env.API_URL ?? "";

export const registerGqlClient = (
  makeClient: () => Promise<ReturnType<typeof getSdk>>,
) => {
  const getClient = cache(makeClient);
  return { getClient };
};

export const { getClient: getGqlClient } = registerGqlClient(async () => {
  if (!serviceAccountJsonString) {
    throw new Error(
      "The $SERVICE_ACCOUNT_JSON environment variable was not found",
    );
  }
  const auth = new GoogleAuth({
    credentials: JSON.parse(serviceAccountJsonString),
  });
  const client = await auth.getIdTokenClient(apiUrl);
  const headers = await client.getRequestHeaders();

  const graphQLClient = new GraphQLClient(`${apiUrl}/query`, {
    headers,
  });
  return getSdk(graphQLClient);
});

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
  const headers = await client.getRequestHeaders();

  const res = await fetch(`${apiUrl}/query`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err.message);
      process.exitCode = 1;

      throw err;
    });
  return res;
}
