import type { CodegenConfig } from "@graphql-codegen/cli";
import type { IGraphQLConfig } from "graphql-config";

const codegenConfig: CodegenConfig = {
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
      // https://github.com/dotansimha/graphql-code-generator-community/issues/501#issuecomment-1817878263
      "sed -i '' -e '1s|.*|import type { GraphQLClient, RequestOptions } from \"graphql-request\";|' -e '2s|.*|type GraphQLClientRequestHeaders = RequestOptions[\"requestHeaders\"];|' src/gql/generated.ts",
    ],
  },
};

const config: IGraphQLConfig = {
  schema: "http://localhost:8080/query",
  documents: "./src/**/*.{ts,tsx}",
  extensions: {
    codegen: codegenConfig,
  },
};

module.exports = config;
