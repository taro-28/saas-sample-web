import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8080/query",
  documents: "./src/**/*.{ts,tsx}",
  generates: {
    "./src/gql/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
    },
  },
  hooks: {
    afterOneFileWrite: [
      "sed -i '' -e '1s|.*|import type { GraphQLClient, RequestOptions } from \"graphql-request\";|' -e '2s|.*|type GraphQLClientRequestHeaders = RequestOptions[\"requestHeaders\"];|' src/gql/generated.ts",
    ],
  },
};

export default config;
