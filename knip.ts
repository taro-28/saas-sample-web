const config = {
  project: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.js", "src/**/*.jsx"],
  ignore: [
    "src/gql/*.ts",
    "src/components/ui/**/*.{ts,tsx}",
    ".github/workflows/ci.yml",
    ".github/workflows/nextjs_bundle_analysis.yml",
  ],
  ignoreDependencies: ["@biomejs/biome", "@graphql-codegen/client-preset"],
  ignoreBinaries: ["check", "type-check"],
};

export default config;
