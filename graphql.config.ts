import type { CodegenConfig } from "@graphql-codegen/cli";
import type { IGraphQLConfig } from "graphql-config";

const codegenConfig: CodegenConfig = {
  generates: {
    "./src/gql/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: "getFragmentData" },
      },
      config: {
        useTypeImports: true,
        skipTypename: true,
        enumsAsTypes: true,
      },
    },
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
