const config = {
  project: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.js", "src/**/*.jsx"],
  ignore: ["src/gql/generated.ts", "src/components/ui/**/*.{ts,tsx}"],
  ignoreDependencies: [
    "@biomejs/biome",
    "@radix-ui/react-slot",
    "class-variance-authority",
  ],
};

export default config;
