const config = {
  project: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.js", "src/**/*.jsx"],
  ignore: ["src/gql/generated.ts", "src/components/ui/**/*.{ts,tsx}"],
  ignoreDependencies: [
    "@biomejs/biome",
    "gzip-size",
    "mkdirp",
    "@graphql-codegen/typescript",
    "@graphql-codegen/typescript-graphql-request",
    "@graphql-codegen/typescript-operations",
  ],
};

export default config;
