const config = {
  project: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.js", "src/**/*.jsx"],
  ignore: [
    "src/gql/generated.ts",
    "src/components/ui/**/*.{ts,tsx}",
    ".github/workflows/ci.yml",
    ".github/workflows/nextjs_bundle_analysis.yml",
  ],
  ignoreDependencies: [
    "@biomejs/biome",
    "@graphql-codegen/typescript",
    "@graphql-codegen/typescript-graphql-request",
    "@graphql-codegen/typescript-operations",
  ],
  ignoreBinaries: ["check", "type-check"],
};

export default config;
